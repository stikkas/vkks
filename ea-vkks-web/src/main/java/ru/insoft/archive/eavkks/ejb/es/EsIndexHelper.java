package ru.insoft.archive.eavkks.ejb.es;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import org.apache.commons.io.FileUtils;
import org.elasticsearch.action.bulk.BulkRequestBuilder;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.common.Base64;
import org.elasticsearch.common.joda.time.format.DateTimeFormat;
import org.elasticsearch.common.xcontent.XContentBuilder;
import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;
import org.elasticsearch.index.query.FilterBuilders;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import ru.insoft.archive.eavkks.ejb.CommonDBHandler;
import ru.insoft.archive.eavkks.ejb.LogWriter;
import ru.insoft.archive.eavkks.model.EaCase;
import ru.insoft.archive.eavkks.model.EaDocument;

/**
 *
 * @author melnikov
 */
@Stateless
public class EsIndexHelper {

	@Inject
	EsAdminHelper esAdmin;
	@Inject
	CommonDBHandler dbHandler;
	@Inject
	LogWriter log;
	@Inject
	EsSearchHelper esSearch;

	public String indexCase(EaCase eaCase) throws IOException {
		Client esClient = esAdmin.getClient();
		EaCase oldCase = null;
		if (eaCase.getId() != null) {
			GetResponse gr = esClient.prepareGet(esAdmin.getIndexName(), "case", eaCase.getId())
					.execute().actionGet();
			if (gr.isExists()) {
				oldCase = esSearch.parseCase(gr.getSourceAsMap());
				Long toporefId = oldCase.getToporef();
				if (!oldCase.getNumber().equals(eaCase.getNumber())
						|| (toporefId == null ? eaCase.getToporef() != null : !toporefId.equals(eaCase.getToporef()))) {
					Integer start = 0, limit = 25;
					Long total;
					BulkRequestBuilder bulk = esClient.prepareBulk();
					do {
						SearchResponse sr = esClient.prepareSearch(esAdmin.getIndexName())
								.setTypes("document")
								.setQuery(QueryBuilders.filteredQuery(
												QueryBuilders.matchAllQuery(),
												FilterBuilders.hasParentFilter("case",
														FilterBuilders.termFilter("_id", eaCase.getId()))))
								.setFrom(start)
								.setSize(limit)
								.execute().actionGet();
						total = sr.getHits().getTotalHits();
						for (SearchHit hit : sr.getHits().getHits()) {
							bulk.add(esClient.prepareUpdate(esAdmin.getIndexName(), "document", hit.getId())
									.setParent(eaCase.getId())
									.setDoc(jsonBuilder()
											.startObject()
											.field("acase", eaCase.getNumber())
											.field("toporef", eaCase.getToporef())
											.endObject()
									)
							);
						}
						start += limit;
					} while (total > start);
					if (bulk.numberOfActions() > 0) {
						bulk.execute().actionGet();
					}
				}
			}
		}

		XContentBuilder src = jsonBuilder()
				.startObject()
				.field("num_prefix", eaCase.getNumPrefix())
				.field("num_number", eaCase.getNumNumber())
				.field("type", eaCase.getType())
				.field("storeLife", eaCase.getStoreLife())
				.field("title", eaCase.getTitle())
				.field("toporef", eaCase.getToporef())
				.field("remark", eaCase.getRemark())
				.field("modUserId", eaCase.getModUserId())
				.field("lastUpdateDate", eaCase.getLastUpdateDate(), DateTimeFormat.forPattern("dd.MM.YYYY HH:mm:ss"));
		if (eaCase.getId() == null) {
			src.field("addUserId", eaCase.getAddUserId())
					.field("insertDate", eaCase.getInsertDate(), DateTimeFormat.forPattern("dd.MM.YYYY HH:mm:ss"));
		}
		src.endObject();

		if (eaCase.getId() == null) {
			IndexResponse ir = esClient.prepareIndex(esAdmin.getIndexName(), "case")
					.setSource(src).execute().actionGet();
			log.logAddCase(ir.getId(), eaCase.getNumber());
			return ir.getId();
		} else {
			esClient.prepareUpdate(esAdmin.getIndexName(), "case", eaCase.getId())
					.setDoc(src).execute().actionGet();
			log.logEditCase(eaCase, oldCase);
			return eaCase.getId();
		}
	}

	public boolean deleteCase(String id) {
		Client esClient = esAdmin.getClient();
		GetResponse gr = esClient.prepareGet(esAdmin.getIndexName(), "case", id)
				.execute().actionGet();
		if (gr.isExists()) {
			esClient.prepareDelete(esAdmin.getIndexName(), "case", id)
					.execute().actionGet();

			EaCase eaCase = esSearch.parseCase(gr.getSourceAsMap());
			eaCase.setId(id);
			log.logDeleteCase(eaCase);
			return true;
		}
		return false;
	}

	public String indexDocument(EaDocument eaDoc, String caseNumber, Long toporefId) throws IOException {
		Client esClient = esAdmin.getClient();
		XContentBuilder src = jsonBuilder()
				.startObject()
				.field("_parent", eaDoc.getCaseId())
				.field("acase", caseNumber)
				.field("toporef", toporefId)
				.field("number", eaDoc.getNumber())
				//.field("volume", eaDoc.getVolume())
				.field("type", eaDoc.getType())
				.field("title", eaDoc.getTitle())
				//.field("startPage", eaDoc.getStartPage())
				//.field("endPage", eaDoc.getEndPage())
				.field("pages", eaDoc.getPages())
				.field("date", eaDoc.getDate())
				.field("remark", eaDoc.getRemark())
				.field("court", eaDoc.getCourt())
				.field("fio", eaDoc.getFio())
				.field("modUserId", eaDoc.getModUserId())
				.field("lastUpdateDate", eaDoc.getLastUpdateDate(), DateTimeFormat.forPattern("dd.MM.YYYY HH:mm:ss"));
		if (eaDoc.getId() == null) {
			src.field("addUserId", eaDoc.getAddUserId())
					.field("insertDate", eaDoc.getInsertDate(), DateTimeFormat.forPattern("dd.MM.YYYY HH:mm:ss"));
		}
		src.endObject();

		if (eaDoc.getId() == null) {
			IndexResponse ir = esClient.prepareIndex(esAdmin.getIndexName(), "document")
					.setParent(eaDoc.getCaseId())
					.setSource(src)
					.execute().actionGet();
			log.logAddDocument(ir.getId(), eaDoc.getNumber(), caseNumber);
			return ir.getId();
		} else {
			GetResponse gr = esClient.prepareGet(esAdmin.getIndexName(), "document", eaDoc.getId())
					.setParent(eaDoc.getCaseId())
					.execute().actionGet();
			esClient.prepareUpdate(esAdmin.getIndexName(), "document", eaDoc.getId())
					.setParent(eaDoc.getCaseId())
					.setDoc(src)
					.execute().actionGet();
			log.logEditDocument(eaDoc, esSearch.parseDocument(gr.getSourceAsMap()), caseNumber);
			return eaDoc.getId();
		}
	}

	public boolean deleteDocument(String docId, String caseId) {
		Client esClient = esAdmin.getClient();
		GetResponse gr = esClient.prepareGet(esAdmin.getIndexName(), "document", docId)
				.setParent(caseId)
				.execute().actionGet();
		if (gr.isExists()) {
			esClient.prepareDelete(esAdmin.getIndexName(), "document", docId)
					.setParent(caseId)
					.execute().actionGet();
			deleteImageFile(docId);

			EaDocument eaDoc = esSearch.parseDocument(gr.getSourceAsMap());
			eaDoc.setId(docId);
			log.logDeleteDocument(eaDoc, (String) gr.getSourceAsMap().get("acase"));
			return true;
		}
		return false;
	}

	public void deleteAllCaseDocuments(String id, List<EaDocument> docs) {
		if (docs != null) {
			for (EaDocument doc : docs) {
				deleteImageFile(doc.getId());
			}
		}

		Client esClient = esAdmin.getClient();
		esClient.prepareDeleteByQuery(esAdmin.getIndexName())
				.setTypes("document")
				.setQuery(QueryBuilders.filteredQuery(QueryBuilders.matchAllQuery(),
								FilterBuilders.termFilter("_parent", id)))
				.execute().actionGet();
	}

	public void indexImage(String caseId, String documentId, byte[] data) throws IOException {
		Path p = FileSystems.getDefault().getPath(esAdmin.getPathToSaveFiles(), documentId + ".pdf");
		try {
			Files.write(p, data, StandardOpenOption.CREATE);
		} catch (IOException e) {
			throw new RuntimeException("Ошибка при записи в файл <" + p.toString() + ">");
		}

		Client esClient = esAdmin.getClient();
		esClient.prepareUpdate(esAdmin.getIndexName(), "document", documentId)
				.setParent(caseId)
				.setDoc(jsonBuilder()
						.startObject()
						.field("graph", Base64.encodeBytes(data))
						.endObject()
				)
				.execute().actionGet();
		GetResponse gr = esClient.prepareGet(esAdmin.getIndexName(), "document", documentId)
				.setParent(caseId)
				.execute().actionGet();
		log.logAttachFile(documentId, (String) gr.getSourceAsMap().get("number"),
				(String) gr.getSourceAsMap().get("acase"));
	}

	public void clearImage(String caseId, String documentId) throws IOException {
		Client esClient = esAdmin.getClient();
		esClient.prepareUpdate(esAdmin.getIndexName(), "document", documentId)
				.setParent(caseId)
				.setDoc(jsonBuilder()
						.startObject()
						.field("graph", "")
						.endObject()
				)
				.execute().actionGet();
		deleteImageFile(documentId);
		GetResponse gr = esClient.prepareGet(esAdmin.getIndexName(), "document", documentId)
				.setParent(caseId)
				.execute().actionGet();
		log.logDetachFile(documentId, (String) gr.getSourceAsMap().get("number"),
				(String) gr.getSourceAsMap().get("acase"));
	}

	public void deleteImageFile(String documentId) {
		File f = new File(esAdmin.getPathToSaveFiles(), documentId + ".pdf");
		if (f.exists()) {
			f.delete();
		}
	}

	public void deleteAllImages() throws IOException {
		File f = new File(esAdmin.getPathToSaveFiles());
		FileUtils.cleanDirectory(f);
	}
}

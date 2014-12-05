package ru.fake.srvcs;

import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import ru.fake.answer.GridAnswer;
import ru.fake.model.DocumentCriteria;
import ru.fake.model.DocumentQuery;
import ru.fake.model.DocumentResult;
import ru.fake.model.EaDocument;
import ru.fake.store.DB;

/**
 *
 * @author С. Благодатских
 */
@Stateless
@Path("docs")
public class DocumentREST {

	@Inject
	DB db;

	@GET
	@Path("search")
	@Produces({"application/json"})
	public GridAnswer findDocumentsByCriteria(
		//		@QueryParam("page") Integer page,
		//		@QueryParam("start") Integer start, @QueryParam("limit") Integer limit,
		//		@QueryParam("q") @DefaultValue("null") DocumentCriteria q) {
		DocumentQuery query) {
		List<EaDocument> docs = db.findDocuments(query.q);
		GridAnswer answer = new GridAnswer(docs.size());
		/*
		 DocumentResult[] results = new DocumentResult[docs.size()];
		 int i = 0;
		 for (EaDocument doc : docs) {
		 results[i++] = new DocumentResult(doc.getEaDocumentId(), doc.getEaCase().getCaseNumber(),
		 doc.getDocNumber(), "Неопределенный", doc.getDocTitle(),
		 doc.getStartPage() + " - " + doc.getEndPage(),
		 doc.getDocDate().toString(),
		 doc.getCourt(),
		 doc.getFio(), "");
		 }
		 answer.setItems(results);
		 */
		return answer;
	}
}

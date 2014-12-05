package ru.fake.srvcs;

import java.text.SimpleDateFormat;
import java.util.List;
import javax.ejb.Stateful;
import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import ru.fake.answer.GridAnswer;
import ru.fake.model.DocumentCriteria;
import ru.fake.model.DocumentResult;
import ru.fake.model.EaDocument;
import ru.fake.store.DB;

/**
 *
 * @author С. Благодатских
 */
@Stateful
@SessionScoped
@Path("docs")
public class DocumentREST {

	private List<EaDocument> prevResult;
	@Inject
	DB db;

	private static SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy");

	@GET
	@Path("search")
	@Produces({"application/json"})
	public GridAnswer findDocumentsByCriteria(
		@QueryParam("page") Integer page,
		@QueryParam("start") Integer start, @QueryParam("limit") Integer limit,
		@QueryParam("q") @DefaultValue("") DocumentCriteria q) {
		List<EaDocument> docs;
		if (q.isNullable() && prevResult != null) {
			docs = prevResult;
		} else {
			prevResult = docs = db.findDocuments(q);
		}
		GridAnswer answer = new GridAnswer(docs.size());
		limit = Math.min(docs.size() - start, limit);
		DocumentResult[] results = new DocumentResult[limit];
		limit += start;
		for (int i = 0; start < limit; ++i, ++start) {
			EaDocument doc = docs.get(start);
			results[i] = new DocumentResult(doc.getEaDocumentId(),
				doc.getEaCase().getCaseNumber(),
				doc.getDocNumber(),
				doc.getType(),
				doc.getDocTitle(),
				doc.getStartPage() + " - " + doc.getEndPage(),
				sdf.format(doc.getDocDate()),
				doc.getCourt(),
				doc.getFio(),
				doc.getPdf()
			);
		}
		answer.setItems(results);
		return answer;
	}
}

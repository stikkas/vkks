package ru.insoft.archive.eavkks.ejb.es;

import java.util.List;
import java.util.Map;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import ru.insoft.archive.eavkks.model.EaCase;
import ru.insoft.archive.eavkks.model.EaDocument;
import ru.insoft.archive.eavkks.webmodel.CaseSearchCriteria;
import ru.insoft.archive.eavkks.webmodel.DocumentSearchCriteria;
import ru.insoft.archive.extcommons.webmodel.OrderBy;

/**
 *
 * @author Благодатских С.
 */
public interface EsSearchHelper {

	List<String> searchFios(String prefix);

	List<String> searchCourts(String prefix);

	List<String> searchCaseNumPrefixes(String prefix);

	SearchHits searchDocuments(final DocumentSearchCriteria q,
			Integer start, Integer limit, List<OrderBy> orders);

	SearchHits searchCases(final CaseSearchCriteria q, Integer start, Integer limit, List<OrderBy> orders);

	Terms queryCaseEdgeDates(Iterable<String> caseIds);

	EaCase getCaseById(String id);

	EaCase parseCase(Map<String, Object> esData);

	/**
	 * Возвращает минимальный возможный для использования номер дела
	 *
	 * @param numPrefix префик для номера дела, наприме, МП
	 * @return свободный номер
	 */
	int queryMaxCaseNumberForPrefix(String numPrefix);

	boolean checkCaseNumberUniqueness(String numPrefix, Integer numNumber, String id);

	SearchHits searchCaseDocuments(String caseId, String context, Integer start, Integer limit, List<OrderBy> orders);

	EaDocument getDocumentById(String id, String caseId);

	EaDocument parseDocument(Map<String, Object> docData);

	String getLinkPrefix();

	boolean isExistsImageFile(String documentId);
}

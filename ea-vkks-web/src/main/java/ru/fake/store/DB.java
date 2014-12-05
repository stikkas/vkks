package ru.fake.store;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import javax.annotation.PostConstruct;
import ru.fake.model.DocumentCriteria;
import ru.fake.model.EaCase;
import ru.fake.model.EaDocument;

/**
 *
 * @author С. Благодатских
 */
public class DB {

	private final List<EaDocument> documents = new ArrayList<EaDocument>();
	private final List<EaCase> cases = new ArrayList<EaCase>();

	private static final Set<String> fio = new HashSet<String>() {
		{
			add("Иванов И.М.");
			add("Петров И.П.");
			add("Цветков И.Я.");
			add("Конанов И.Н.");
			add("Ушаков И.И.");
			add("Бузенков И.И.");
			add("Безногий Б.Б.");
			add("Ручейник Р.И.");
			add("Гнездо Г.И.");
			add("Окно И.И.");
			add("Качан К.И.");
			add("Трутнов И.И.");
			add("Ковалев И.И.");
			add("Жмульков В.В.");
		}
	};

	private static final Set<String> court = new HashSet<String>() {
		{
			add("Хамовнический");
			add("Рамовнический");
			add("Бамовнический");
			add("Гамовнический");
			add("Жамовнический");
			add("Памовнический");
			add("Замовнический");
			add("Цамовнический");
			add("Шамовнический");
			add("Петровский");
			add("Высший");
		}
	};
	private static final String[] docTemplate = {"1", "Документ такой-то", "1", "10",
		"2014", "4", "21", "Замечание по документу"};

	private static final Random random = new Random();

	@PostConstruct
	void initData() {
		int i = 1;
		String[] courts = court.toArray(new String[0]);
		String[] fios = fio.toArray(new String[0]);

		for (int j = 1; j < 40; ++j) {
			Integer numberCase = Math.abs(random.nextInt()) % 100;
			EaCase acase = new EaCase(j, numberCase.toString(), "Дело №" + numberCase, "Замечания по делу");
			for (; i < 50 * j; ++i) {
				EaDocument doc = new EaDocument(docTemplate);
				doc.setCourt(courts[Math.abs(random.nextInt()) % courts.length]);
				doc.setFio(fios[Math.abs(random.nextInt()) % fios.length]);
				doc.setDocNumber("" + Math.abs(random.nextInt()) % 100);
				doc.setEaDocumentId(i);
				documents.add(doc);
				acase.addEaDocument(doc);
			}
			cases.add(acase);
		}
	}

	public void addCase(EaCase acase) {
		acase.setEaCaseId(cases.size() + 1);
		cases.add(acase);
	}

	public void addDocument(EaDocument doc) {
		doc.setEaDocumentId(documents.size() + 1);
		documents.add(doc);
		court.add(doc.getCourt());
		fio.add(doc.getFio());
	}

	public String[] getFios() {
		return fio.toArray(new String[fio.size()]);
	}

	public String[] getCourts() {
		return court.toArray(new String[court.size()]);
	}

	public List<EaDocument> findDocuments(DocumentCriteria criteria) {
		List<EaDocument> result = new ArrayList<EaDocument>();
		for (EaDocument doc : documents) {
			if (criteriaFound(doc, criteria)) {
				result.add(doc);
			}
		}
		return result;
	}

	private boolean criteriaFound(EaDocument doc, DocumentCriteria criteria) {
		if (criteria.volume != null && !doc.getVolume().equals(criteria.volume)) {
			return false;
		}
		if (criteria.number != null && !doc.getDocNumber().contains(criteria.number)) {
			return false;
		}
		if (criteria.title != null && !doc.getDocTitle().contains(criteria.title)) {
			return false;
		}
		if (criteria.startPage != null && !doc.getStartPage().equals(criteria.startPage)) {
			return false;
		}
		if (criteria.endPage != null && !doc.getEndPage().equals(criteria.endPage)) {
			return false;
		}
		if (criteria.date != null && doc.getDocDate().compareTo(criteria.date) != 0) {
			return false;
		}
		if (criteria.court != null && !doc.getCourt().equals(criteria.court)) {
			return false;
		}
		if (criteria.remark != null && !doc.getRemark().contains(criteria.remark)) {
			return false;
		}
		return !(criteria.fio != null && !doc.getFio().equals(criteria.fio));
	}
}

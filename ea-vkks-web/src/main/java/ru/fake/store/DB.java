package ru.fake.store;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import ru.fake.model.DocumentCriteria;
import ru.fake.model.EaCase;
import ru.fake.model.EaDocument;

/**
 *
 * @author С. Благодатских
 */
@Singleton
public class DB implements Serializable {

	private static List<EaDocument> documents = new ArrayList<EaDocument>();
	private static List<EaCase> cases = new ArrayList<EaCase>();

	private static Set<String> fio = new HashSet<String>() {
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
	private static DictValue[] caseType = {
		new DictValue(21l, "иные материалы", "CT_11"),
		new DictValue(18l, "материалы о привлечении к дисциплинарной ответственности", "CT_08"),
		new DictValue(17l, "материалы по заявлениям", "CT_07"),
		new DictValue(14l, "материалы по организации, подготовке и проведению заседаний и иных мероприятий ВККС ", "CT_04"),
		new DictValue(15l, "материалы по переписке ВККС с органами государственной власти, органами судейского сообщества и общественными организациями", "CT_05"),
		new DictValue(19l, "материалы по привлечению судей к уголовной ответственности", "CT_09"),
		new DictValue(16l, "материалы проверок", "CT_06"),
		new DictValue(23l, "ответы ВККС РФ на обращения (жалобы) физических и юридических лиц, передаваемых в отдел прохождения документов Управления делами", "CT_13"),
		new DictValue(12l, "отчетные доклады ВККС ", "CT_02"),
		new DictValue(22l, "официальное издание Вестник ВККС", "CT_12"),
		new DictValue(13l, "разъяснения и рекомендации ВККС;", "CT_03"),
		new DictValue(11l, "решения и заключения ВККС ", "CT_01"),
		new DictValue(20l, "статистические отчеты", "CT_10")};

	private static DictValue[] docType = {
		new DictValue(28l, "Поручение", "DT_01"),
		new DictValue(29l, "Обращение", "DT_02"),
		new DictValue(30l, "Опись", "DT_03"),
		new DictValue(31l, "CD диск", "DT_04"),
		new DictValue(32l, "Копия обращения", "DT_05"),
		new DictValue(33l, "Копия сопроводительного письма", "DT_06"),
		new DictValue(34l, "Ответ Председателя Совета судей РФ", "DT_07"),
		new DictValue(35l, "Копия сопроводительного письма Председателю Следственного комитета РФ", "DT_08"),
		new DictValue(36l, "Ответ Следственного комитета РФ", "DT_09"),
		new DictValue(37l, "Конверт", "DT_10"),
		new DictValue(38l, "Докладная записка Председателю ВККС РФ", "DT_11"),
		new DictValue(39l, "Ответ ВККС РФ", "DT_12"),
		new DictValue(40l, "Объявление", "DT_13"),
		new DictValue(41l, "Заявление", "DT_14"),
		new DictValue(42l, "Справка", "DT_15"),
		new DictValue(43l, "Характеристика", "DT_16"),
		new DictValue(44l, "Основные показатели", "DT_17"),
		new DictValue(45l, "Уведомления", "DT_18"),
		new DictValue(46l, "Копия анкеты", "DT_19"),
		new DictValue(47l, "Запрос", "DT_20"),
		new DictValue(48l, "Заявление об ознакомлении с материалами", "DT_21"),
		new DictValue(49l, "Жалоба с приложением", "DT_22"),
		new DictValue(50l, "Конверт (приложение к жалобе)", "DT_23"),
		new DictValue(51l, "Ходатайство о приобщении документов к материалам дела с приложением", "DT_24"),
		new DictValue(52l, "Файл с фотографиями (приложение к ходатайству)", "DT_25"),
		new DictValue(53l, "Протокол", "DT_26"),
		new DictValue(54l, "Решение", "DT_27"),
		new DictValue(55l, "Заявление о выдаче протокола", "DT_28"),
		new DictValue(56l, "Сопроводительное письмо", "DT_29")
	};
	private static Set<String> court = new HashSet<String>() {
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

	private static Random random = new Random();

	@PostConstruct
	void initData() {
		System.out.println("In initData");
		int i = 1;
		String[] courts = court.toArray(new String[0]);
		String[] fios = fio.toArray(new String[0]);

		for (int j = 1; j < 40; ++j) {
			Integer numberCase = Math.abs(random.nextInt()) % 100;
			EaCase acase = new EaCase(j, "№" + numberCase,
				"Простое дело ", "Замечания по делу",
				caseType[Math.abs(random.nextInt()) % caseType.length].name
			);
			for (; i < 30 * j; ++i) {

				Calendar cal = new GregorianCalendar();
				cal.add(Calendar.YEAR, random.nextInt() % 50);
				cal.add(Calendar.MONTH, random.nextInt() % 12);
				cal.add(Calendar.DAY_OF_YEAR, random.nextInt() % 365);

				EaDocument doc = new EaDocument(i, 1l, "№" + i, "Просто документ",
					1l, 10l,
					cal.getTime(), "Примечания",
					courts[Math.abs(random.nextInt()) % courts.length],
					fios[Math.abs(random.nextInt()) % fios.length],
					docType[Math.abs(random.nextInt()) % docType.length].name,
					i % 5 == 0 ? "/ea-vkks-web/file.pdf" : null);

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
		if (criteria.date != null && !compareDate(doc.getDocDate(), criteria.date)) {
			return false;
		}
		if (criteria.court != null && !doc.getCourt().equals(criteria.court)) {
			return false;
		}
		if (criteria.remark != null && !doc.getRemark().contains(criteria.remark)) {
			return false;
		}
		if (criteria.type != null && !equalTypes(criteria.type, doc.getType(), docType)) {
			return false;
		}
		return !(criteria.fio != null && !doc.getFio().equals(criteria.fio));

	}

	private boolean compareDate(Date date1, Date date2) {
		Calendar cal1 = new GregorianCalendar();
		cal1.setTime(date1);
		Calendar cal2 = new GregorianCalendar();
		cal2.setTime(date2);
		return cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR)
			&& cal1.get(Calendar.MONTH) == cal2.get(Calendar.MONTH)
			&& cal1.get(Calendar.DATE) == cal2.get(Calendar.DATE);
	}

	/**
	 * Сравнивает два типа, у одного берется id у второго name
	 */
	private boolean equalTypes(Long id, String name, DictValue[] types) {
		for (DictValue value : types) {
			if (value.name.equals(name)) {
				return value.id.equals(id);
			}
		}
		return false;
	}

	private static class DictValue {

		Long id;
		String name;
		String code;

		public DictValue(Long id, String name, String code) {
			this.id = id;
			this.name = name;
			this.code = code;
		}

	}
}

package ru.fake.store;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.Iterator;
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

	private static Set<String> fio;
	private static Set<String> court;

	private static String bigABC = "АБВГДЕЁЖЗИЙКЛМНОПРСТФЧУХЮШЦЩЭЯ";
	private static int bigABCLength = bigABC.length();
	private static String smallABC = "абвгдеёжзийклмнопрстфчухышцщэя";
	private static int smallABCLength = smallABC.length();
	private static Random random = new Random();

	@PostConstruct
	void initData() {
		// инициализация списка фамилий--------------------
		fio = new HashSet<>();
		for (int j = 0; j < 1000000; ++j) {
			StringBuilder sb = new StringBuilder("" + bigABC.charAt(random.nextInt(bigABCLength)));
			int familySize = random.nextInt(10) + 10;
			for (int k = 0; k < familySize; ++k) {
				sb.append(smallABC.charAt(random.nextInt(smallABCLength)));
			}
			sb.append(" ")
				.append(bigABC.charAt(random.nextInt(bigABCLength)))
				.append(".")
				.append(bigABC.charAt(random.nextInt(bigABCLength)))
				.append(".");
			fio.add(sb.toString());
		}
		//----------------------------------------------------

		// иницализация списка судов--------------------------
		court = new HashSet<>();
		for (int j = 0; j < 1000000; ++j) {
			StringBuilder sb = new StringBuilder("" + bigABC.charAt(random.nextInt(bigABCLength)));
			int courtSize = random.nextInt(15) + 10;
			for (int k = 0; k < courtSize; ++k) {
				sb.append(smallABC.charAt(random.nextInt(smallABCLength)));
			}
			court.add(sb.toString());
		}
		//----------------------------------------------------

		// иницализация базы документов и дел------------------
		int i = 1;
		String[] courts = court.toArray(new String[0]);
		String[] fios = fio.toArray(new String[0]);

		for (int j = 1; j < 40; ++j) {
			Integer numberCase = random.nextInt(100) + 1;
			EaCase acase = new EaCase(j, "№" + numberCase,
				"Простое дело ", "Замечания по делу",
				caseType[random.nextInt(caseType.length)].name
			);
			for (; i < 30 * j; ++i) {

				Calendar cal = new GregorianCalendar();
				cal.add(Calendar.DAY_OF_YEAR, random.nextInt() % 3650);

				EaDocument doc = new EaDocument(i, 1l, "№" + i, "Просто документ",
					1l, 10l,
					cal.getTime(), "Примечания",
					courts[random.nextInt(courts.length)],
					fios[random.nextInt(fios.length)],
					docType[random.nextInt(docType.length)].name,
					i % 5 == 0 ? "/ea-vkks-web/file.pdf" : null);

				documents.add(doc);
				acase.addEaDocument(doc);
			}
			cases.add(acase);
		}
		//----------------------------------------------------

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

	/**
	 * Возвращает списко ФИО, начинающихся с key (не более 25)
	 *
	 * @param key начальная последовательность символов для ФИО
	 * @return список найденных ФИО
	 */
	public List<String> getFios(String key) {
		return getChunck(key, fio);
	}

	/**
	 * Возвращает списко судов, начинающихся с key (не более 25)
	 *
	 * @param key начальная последовательность символов для суда
	 * @return список найденных судов
	 */
	public List<String> getCourts(String key) {
		return getChunck(key, court);
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
	 * Возвращает часть данных из массива, соответсвующих заданному критерию
	 *
	 * @param query критерий поиска
	 * @param data источник данных
	 * @return новый массив данных
	 */
	private List<String> getChunck(String query, Set<String> data) {
		int i = 25;
		List<String> result = new ArrayList<>(25);
		Iterator<String> iterator = data.iterator();
		while (iterator.hasNext() && i > 0) {
			String item = iterator.next();
			if (item.startsWith(query)) {
				result.add(item);
				--i;
			}
		}
		return result;
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

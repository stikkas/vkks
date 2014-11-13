// В этом файле находятся общие данные для всего приложения

// Т.к. у нас один язык, то используем упрощенную схему
Trans = {
	vkks: "ВЫСШАЯ КВАЛИФИКАЦИОННАЯ КОЛЛЕГИЯ СУДЕЙ РОССИЙСКОЙ ФЕДЕРАЦИИ",
	docs: "Документы",
	cases: "Дела",
	admin: "Администратор",
	main: "Главная",
	search: "Поиск",
	caseSearch: "Поиск дел",
	docSearch: "Поиск документов",
	searchResult: "Результаты поиска",
	clear: "Очистить",
	add: "Добавить",
	edit: "Редактировать",
	save: "Сохранить",
	del: "Удалить",
	graphs: "Графические<br>образы",
	graphS: "Графические образы",
	caseDocs: "Документы<br>дела",
	exit: "Выход",
	acase: "Дело",
	caseNum: "№ дела",
	caseType: "Тип дел / документов",
	departmnt: "Структурное подразделение",
	startDate: "Дата начала",
	endDate: "Дата окончания",
	storeLife: "Срок хранения",
	volume: "Том",
	volumeNum: "№ тома",
	title: "Заголовок",
	pagesCount: "Количество листов",
	remark: "Примечание",
	topoRef: "Топографический указатель",
	backToSearch: "Вернуться к<br>результатам<br>поиска",
	doc: "Документ",
	docNum: "№ документа",
	docDate: "Дата документа",
	docTitle: "Заголовок документа",
	caseTitle: "Заголовок дела",
	startPageNum: "№ начального листа",
	endPageNum: "№ конечного листа",
	caseSubject: "В отношении кого рассматривался вопрос",
	court: "Суд",
	graphsView: "Просмотр графических образов",
	backToCard: "Вернуться в<br>карточку",
	type: "Тип",
	volumesCount: "Количество томов",
	dates: "Даты",
	whoSign: "Кто подписал",
	textSearch: "Поиск по тексту",
	enter: "Вход",
	user: "Пользователь",
	pass: "Пароль",
	tenter: "Войти",
	firstDoc: "Первый документ",
	lastDoc: "Последний документ",
	prevDoc: "Предыдущий документ",
	nextDoc: "Следующий документ"
};

Pages = {
	home: 'home',
	acase: 'acase',
	doc: 'adoc',
	scase: 'casesearch',
	sdoc: 'docsearch',
	vgraph: 'graphview'
};
RootContext = '/ea-vkks-web/';
Urls = {
	root: RootContext,
	login: RootContext + 'login.html',
	logout: RootContext + 'srvcs/logout'
};
/**
 * Показывает ошибки в диалоговом окне
 * @param {String} title заголовок окна
 * @param {String} message сообщение об ошибке
 * @method showError
 */
showError = function (title, message) {
	if (message instanceof Object) {
		if (message.statusText) {
			message = message.statusText;
		} else {
			console.log(message);
			return;
		}
	}
	Ext.Msg.show({
		title: title,
		msg: message,
		buttons: Ext.Msg.OK,
		icon: Ext.Msg.ERROR,
		maxWidth: 800
	});
};

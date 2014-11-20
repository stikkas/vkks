// В этом файле находятся общие данные для всего приложения

// Т.к. у нас один язык, то используем упрощенную схему
Trans = {
	vkks: "ВЫСШАЯ КВАЛИФИКАЦИОННАЯ КОЛЛЕГИЯ СУДЕЙ РОССИЙСКОЙ ФЕДЕРАЦИИ",
	docs: "Документы",
	cases: "Дела",
	caseDocs: "Документы дела",
	caseDocsSearch: "Поиск документов дела",
	admin: "Администратор",
	main: "Главная",
	search: "Поиск",
	caseSearch: "Поиск дел",
	caseAdd: "Добавление дела",
	docAdd: "Добавление<br>документа",
	docSearch: "Поиск документов",
	searchResult: "Результаты поиска",
	clear: "Очистить",
	add: "Добавить",
	edit: "Редактировать",
	save: "Сохранить",
	remove: "Удалить",
	graphs: "Графические<br>образы",
	graphS: "Графические образы",
	caseDocs1: "Документы<br>дела",
	exit: "Выход",
	acase: "Дело",
	caseNum: "№ дела",
	caseType: "Тип дела",
	departmnt: "Структурное подразделение",
	startDate: "Начальная дата",
	endDate: "Конечная дата",
	storeLife: "Срок хранения",
	volume: "Том",
	volumeNum: "№ тома",
	title: "Заголовок",
	pagesCount: "Количество листов",
	remark: "Примечание",
	caseRemark: "Примечание к делу",
	topoRef: "Топографический указатель",
	backToSearch: "Вернуться к<br>результатам<br>поиска",
	doc: "Документ",
	docNum: "№ документа",
	docDate: "Дата документа",
	docTitle: "Заголовок документа",
	caseTitle: "Название дела",
	startPageNum: "№ начального листа",
	endPageNum: "№ конечного листа",
	caseSubject: "В отношении кого рассматривался вопрос",
	court: "Суд",
	graphsView: "Просмотр графических образов",
	backToCase: "Вернуться<br>в дело",
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
	scases: 'scases',
	docadd: 'docadd',
	caseadd: 'caseadd',
	sdocs: 'sdocs',
	vgraph: 'graphview'
};
RootContext = '/ea-vkks-web/';
Urls = {
	root: RootContext,
	login: RootContext + 'login.html',
	logout: RootContext + 'srvcs/logout',
	dict: RootContext + 'srvcs/dict',
	search: RootContext + 'srvcs/search',
	user: RootContext + 'srvcs/user'
};
/**
 * параметры для получения справочников с сервера
 * @type {Object}
 */
Dicts = {
	storelife: 'storelife',
	casetype: 'casetype',
	doctype: 'doctype',
	toporef: 'toporef'
};
/**
 * Параметры для получения резельтатов поиска
 */
Searchs = {
	doc: 'doc',
	acase: 'case'
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
/**
 * Показывает предупреждение в диалоговом окне
 * @param {String} title заголовок окна
 * @param {String} message сообщение об ошибке
 * @param {Function} fn обработчик ответа от пользователя
 * @param {Object} scope контекст вызова обработчика
 * @method showError
 */
showAlert = function (title, message, fn, scope) {
	Ext.Msg.show({
		title: title,
		msg: message,
		buttons: Ext.Msg.YESNO,
		icon: Ext.Msg.INFO,
		fn: fn,
		scope: scope,
		maxWidth: 800
	});
};

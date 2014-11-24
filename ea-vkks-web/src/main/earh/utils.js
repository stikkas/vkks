// В этом файле находятся общие данные для всего приложения

PDFJS.workerSrc = '/pdf.js/pdf.worker.js'; // устанавливаем место расположение обработчика PDF
// Т.к. у нас один язык, то используем упрощенную схему
Trans = {
	vkks: "высшая квалификационная коллегия судей российской федерации",
	docs: "Документы",
	cases: "Дела",
	caseDocs: "Документы дела",
	caseDocs_: "Документы<br>дела",
	caseDocsSearch: "Поиск документов дела",
	admin: "Администратор",
	main: "Главная",
	search: "Поиск",
	caseSearch: "Поиск дел",
	caseAdd: "Добавление дела",
	docSearch_: "Поиск<br>документов",
	docSearch: "Поиск документов",
	searchResult: "Результаты поиска",
	clear: "Очистить",
	add: "Добавить",
	edit: "Редактировать",
	save: "Сохранить",
	remove: "Удалить",
	graph_: "Граф.<br>образ",
	graph: "Графический образ",
	addGraph: "Добавить графический образ",
	exit: "Выход",
	show: "Показать",
	acase: "Дело",
	caseNum: "№ дела",
	caseType: "Тип дела",
	docType: "Вид документа",
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
	docNum_: "№<br>документа",
	docDate: "Дата документа",
	docDate_: "Дата<br>документа",
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
	nextDoc: "Следующий документ",
	fio: "ФИО",
	ctxSearch: "Контекстный поиск",
	pages: "Листы"
};

Pages = {
	home: 'home',
	acase: 'acase',
	adoc: 'adoc',
	scases: 'scases',
	docadd: 'docadd',
	sdocs: 'sdocs',
	vgraph: 'graphview'
};

RootContext = '/ea-vkks-web/';
Urls = {
	root: RootContext,
	login: RootContext + 'login.html',
	logout: RootContext + 'srvcs/logout',
	dict: RootContext + 'srvcs/dict',
	cases: RootContext + 'srvcs/search/cases',
	docs: RootContext + 'srvcs/search/docs',
	casedocs: RootContext + 'srvcs/search/casedocs',
	user: RootContext + 'srvcs/user',
	fios: RootContext + 'srvcs/users',
	courts: RootContext + 'srvcs/courts',
	ccase: RootContext + 'srvcs/create/case'
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
 * @method showAlert
 */
showAlert = function (title, message, fn, scope) {
	Ext.Msg.show({
		title: title,
		msg: message,
		buttons: Ext.Msg.YESNO,
		icon: Ext.Msg.QUESTION,
		fn: fn,
		scope: scope,
		maxWidth: 800
	});
};
/**
 * Показывает сообщение об успешной операции
 * @param {String} title заголовок окна
 * @param {String} message сообщение
 * @method showInfo
 */
showInfo = function (title, message) {
	Ext.Msg.show({
		title: title,
		msg: message,
		buttons: Ext.Msg.OK,
		icon: Ext.Msg.INFO,
		maxWidth: 800
	});
};
/**
 * Колонка для ссылки на графический образ
 */
graphLinkColumn = {
	text: Trans.graph_,
	xtype: 'actioncolumn',
	dataIndex: 'graph',
	items: [{
			icon: 'resources/images/graph.png',
			tooltip: Trans.show,
			handler: function (grid, rowIndex) {
				var url = grid.getStore().getAt(rowIndex).get('graph');
				window.open(url);
			},
			getClass: function (v, meta) {
				if (!v)
					meta.style = "display: none;";
				else
					meta.style = "cursor: pointer;";
				return '';
			}
		}]
};
/**
 * Обработчик изменения значения требуемого поля
 * @param {form.field.Base} field поле, чье значение изменилось
 */
requiredFieldChanged = function (field) {
	var form = field.up('form');
	if (form) {
		var valid = true;
		form.items.each(function (it) {
			if (!(it.allowBlank || it.isValid()))
				return valid = false;
		});
		form.fireEvent('validChanged', valid);
	}
};

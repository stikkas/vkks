// В этом файле находятся общие данные для всего приложения

//PDFJS.workerSrc = '/pdf.js/pdf.worker.js'; // устанавливаем место расположение обработчика PDF
// Т.к. у нас один язык, то используем упрощенную схему
Trans = {
	version: "ver. 2.0.0",
	vkks: "высшая квалификационная коллегия судей российской федерации",
	docs: "Документы",
	cases: "Дела",
	caseDocs: "Документы дела",
	caseDocs_: "Документы<br>дела",
	caseDocsSearch: "Поиск документов дела",
	admin: "Администратор",
	main: "Главная",
	search: "Поиск",
	dicts: "Справочники и классификаторы",
	accessControl: "Управление доступом",
	users: "Пользователи",
	groups: "Группы",
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
	addGraph: "Добавить графический образ в формате PDF/A",
	exit: "Выход",
	show: "Показать",
	acase: "Дело",
	caseNum: "№ дела",
	caseNum_: "№<br>дела",
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
	pages: "Листы",
	delGraph: "Удалить графический образ",
	file: "Файл",
	card: "Карточка"
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
	login: RootContext + 'login.html#login',
	logout: RootContext + 'srvcs/logout',
	dict: RootContext + 'srvcs/dict',
	cases: RootContext + 'srvcs/search/cases',
	docs: RootContext + 'srvcs/search/docs',
	rcase: RootContext + 'srvcs/remove/case',
	rdoc: RootContext + 'srvcs/remove/doc',
	rgraph: RootContext + 'srvcs/remove/graph',
//	docs: RootContext + 'fake/docs/search',
	casedocs: RootContext + 'srvcs/search/casedocs',
	user: RootContext + 'srvcs/user',
	fios: RootContext + 'srvcs/users',
//	fios: RootContext + 'fake/bigdicts/users',
	courts: RootContext + 'srvcs/courts',
//	courts: RootContext + 'fake/bigdicts/courts',
	ccase: RootContext + 'srvcs/create/case',
	cdoc: RootContext + 'srvcs/create/doc',
	cgraph: RootContext + 'srvcs/create/graph',
	scase: RootContext + 'srvcs/search/case',
	sdoc: RootContext + 'srvcs/search/doc'
};
/**
 * параметры для получения справочников с сервера
 * @type {Object}
 */
Dicts = {
	storelife: 'CASE_STORE_LIFE',
	casetype: 'CASE_TYPE',
	doctype: 'DOCUMENT_TYPE'
};
Actions = {
	plain: 'getDictValues',
	tree: 'getToporef'
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
 * @param {Function} fn вызывается по закрытии диалога
 * @method showError
 */
showError = function (title, message, fn) {
	if (message instanceof Object) {
		if (message.statusText) {
			message = message.statusText;
		} else {
			console.log(message);
			fn();
			return;
		}
	}
	Ext.Msg.show({
		title: title,
		msg: message,
		buttons: Ext.Msg.OK,
		icon: Ext.Msg.ERROR,
		fn: fn,
		maxWidth: 800
	});
};
/**
 * Показывает предупреждение в диалоговом окне
 * @param {String} title заголовок окна
 * @param {String} message сообщение об ошибке
 * @param {Function} fn обработчик ответа от пользователя
 * @param {Object} scope контекст вызова обработчика
 * @param {Object} args дополнительные аргументы для функции
 * @method showAlert
 */
showAlert = function (title, message, fn, scope, args) {
	Ext.Msg.show({
		title: title,
		msg: message,
		buttons: Ext.Msg.YESNO,
		icon: Ext.Msg.QUESTION,
		fn: fn,
		scope: scope,
		maxWidth: 800,
		args: args
	});
};
/**
 * Показывает диалог при попытки покинуть страницу с несохраненными данными
 * @param {Object} controller контроллер, обрабатывающий ситуацию
 * @param {String} where может быть либо названием страницы, куда надо перенаправить,
 * или именем функции, которую надо вызвать, в случае утвердительного ответа
 */
exitWithoutSave = function (controller, where) {
	showAlert('Контроль', 'Выйти без сохранения?', function (btn) {
		if (btn === 'yes') {
			if (controller[where])
				controller[where]();
			else
				controller.view.setActiveItem(where);
		}
	});
};

/**
 * Показывает диалог при попытки удалить документ, дело
 * @param {String} msg описательная часть что удаляем (дело, документ)
 * @param {Function} fn функция, которая вызывается в случае утвердительного ответа
 */
requestToRemove = function (msg, fn) {
	showAlert('Контроль', 'Выйти действительно хотите удалить ' + msg + '?', function (btn) {
		if (btn === 'yes') {
			fn();
		}
	});
};

/**
 * Сообщает о неправильном заполнении формы при сохранении
 */
ctrlRequiredFields = function () {
	Ext.Msg.show({
		title: 'Контроль наличия значений',
		msg: 'Отсутствуют значения в полях,<br>обязательных для сохранения',
		buttons: Ext.Msg.OK,
		icon: Ext.Msg.ERROR
	});
};
/**
 * Показывает сообщение об успешной операции
 * @param {String} title заголовок окна
 * @param {String} message сообщение
 * @param {Function} fn функция для выполнение после нажатия на кнопку
 * @method showInfo
 */
showInfo = function (title, message, fn) {
	Ext.Msg.show({
		title: title,
		msg: message,
		buttons: Ext.Msg.OK,
		icon: Ext.Msg.INFO,
		maxWidth: 400,
		fn: fn
	});
};
/**
 * Отображает сообщение о пустых результатах поиска
 */
emptySearchResult = function () {
	showInfo('Результаты поиска', 'Не найдены единицы учета,<br> удволетворяющие заданным критериям поиска');
};
/**
 * Колонка для ссылки на графический образ
 */
graphLinkColumn = {
	text: Trans.graph_,
//	width: '5%',
	flex: 0.5,
	xtype: 'actioncolumn',
	dataIndex: 'graph',
	renderer: null,
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
/**
 * Добавляет контекстную подсказку для ячеек таблиц поиска
 * @param {String} value значение ячейчки
 * @param {Object} metaData объект с настройками
 */
tipRenderer = function (value, metaData) {
	if (value)
		metaData.tdAttr = 'data-qtip="' + value + '"';
	return value;
};

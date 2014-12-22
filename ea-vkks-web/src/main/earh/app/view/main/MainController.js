Ext.define('Earh.view.main.MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.main',
	requires: [
		'Earh.view.search.Case',
		'Earh.view.search.Doc',
		'Earh.view.work.Case',
		'Earh.view.work.Doc'
	],
	control: {
		acase: { // Форма работы с делом
			activate: 'setCaseMenu',
			backToSearch: 'backToSearch',
			removeModel: 'removeModel',
			toMain: 'toMain',
			toDocEn: 'toDocEnable'
		},
		adoc: {
			afterrender: 'docRender',
			backToCase: 'backToCase'
		}
	},
	init: function () {
		var controller = this,
//				subscribers = controller.subscribers = [],
				listenersFormPages = {};
		// Подпсчики на событие 'validChanged'
		/*
		 subscribers.push({
		 button: controller.view.items.getAt(0)._tb.items.getAt(5), // Кнопка сохранить
		 validChanged: function (valid) {
		 this.button.setDisabled(!valid);
		 }
		 });
		 */
		for (var o in Pages)
			listenersFormPages[Pages[o]] = {activate: 'showTB'};
//		listenersFormPages.form = {validChanged: 'validChanged'};
		controller.listen({component: listenersFormPages});
		controller.callParent();
	},
	/**
	 * Отображает панель инструментов для текущей страницы
	 * @param {Object} page страница (центральный виджет)
	 */
	showTB: function (page) {
		this.view.showTB(page.tbb);
	},
	/**
	 * Скрывает панель инструментов целиком (сейчас не используется).
	 */
	hideTB: function () {
		this.view.hideTB();
	},
	/**
	 * Перенаправляет на требуюмую страницу.
	 * Перед перенапралением проверяет есть ли несохраненые данные.
	 * Каждая страница должна реализовывать интерфейс isDirty
	 * @param {String} page - страница, на которую нужно уйти, либо метод этого контроллера,
	 * который нужно выполнить в случае утвердительного ответа.
	 */
	toPage: function (page) {
		if (this.view.getActiveItem().isDirty()) {
			exitWithoutSave(this, page);
			return;
		}
		if (this[page])
			this[page]();
		else
			this.view.setActiveItem(page);
	},
	/**
	 * Перенапраление на главную страницу по кнопке "Главная"
	 */
	toMain: function () {
		this.toPage(Pages.home);
	},
	/**
	 * Перенаправление  к странице поиска дел
	 */
	toCasesSearch: function () {
		this.view.setActiveItem(Pages.scases);
		this.view.getActiveItem().clear();
	},
	/**
	 * Перенаправление к странице поиска дел с проверкой несохраненных данных
	 */
	toCasesSearch1: function () {
		this.toPage('toCasesSearch');
	},
	/**
	 * Перенаправление к странице дела,
	 * когда щелкаем по делу из результатов поиска
	 * @param {Object} gridview вьюха панели результатов поиска
	 * @param {Object} cell ячейка, по которой щелкнули (не используется)
	 * @param {Number} idcell номер ячейки, по которой щелкнули (не используется)
	 * @param {Ext.data.Model} record запись с данными (не используется)
	 * @param {Object} row ряд, по которому щелкнули (не используется)
	 * @param {Number} idrow номер ряда, по которому щелкнули
	 */
	toCase: function (gridview, cell, idcell, record, row, idrow) {
		var store = gridview.store;
		this.view.setActiveItem(Pages.acase);
		this.view.getActiveItem().store.loadPage(idrow + (store.currentPage - 1) * store.pageSize + 1);
	},
	/**
	 * Добавляем дело
	 */
	addCase: function () {
		this.view.setActiveItem(Pages.acase);
	},
	/**
	 * Перенаправление к странице поиска документов
	 */
	toDocsSearch: function () {
		this.view.setActiveItem(Pages.sdocs);
		this.view.getActiveItem().clear();
	},
	/**
	 * Обработчик события нажатия на клавишу "Выход"
	 */
	onExit: function () {
		this.toPage('exit'); // exit - это функция
	},
	/**
	 * Завершает работу и перенаправляет пользователя на страницу приветствия
	 */
	exit: function () {
		Ext.Ajax.request({
			url: Urls.logout,
			success: function () {
				window.location.href = Urls.login;
			},
			failure: function () {
				console.log(arguments);
			}
		});
	},
	/**
	 * Функция поиска дел, документов
	 */
	search: function () {
		this.view.getActiveItem().search();
	},
	/**
	 * Функция сохранения дела, документа
	 */
	save: function () {
		var page = this.view.getActiveItem();
		if (page.isValid())
			page.save();
		else
			ctrlRequiredFields();
	},
	/**
	 * Функция удаления дела, документа
	 */
	remove: function () {
		this.view.getActiveItem().remove();
	},
	/**
	 * Устанавливает меню для ЭФ "Дело" и инициализирует ЭФ "Дело"
	 * @param page {Object} ЭФ "Дело"
	 * @param prev {Object} предыдущая ЭФ
	 */
	setCaseMenu: function (page, prev) {
		// подготавливаем ЭФ для создания нового дела. Возможно только при наличии роли редактирования
		if (prev.$className === 'Earh.view.home.Home') {
			page.clear();
			page.switchEdit(true);
			page.tbb = page.hbtns[3];
		} else if (prev.$className !== 'Earh.view.work.Doc') {
			page.switchEdit(false);
		}
	},

	/**
	 * Вызывается когда форма запускает событие 'validChanged'
	 * @param {Boolean} valid валидна или нет форма
	 */
	validChanged: function (valid) {
		this.subscribers.forEach(function (s) {
			s.validChanged(valid);
		});
	},
	/**
	 * Контекстный поиск документов относительно дела
	 */
	searchDocs: function () {
		showInfo("Тестовый режим", "Эта функциональность в разработке");
	},
	/**
	 * Добавляет документ к делу (Создает новый документ)
	 */
	addDoc: function () {
		this.view.setActiveItem(Pages.adoc);
	},
	/**
	 *  Переход на страницу редактирования документа
	 */
	toDoc: function () {
		this.view.setActiveItem(Pages.adoc);
		this.view.getActiveItem().open(arguments[8].caseId, arguments[3].id);
	},
	/**
	 * вернуться к результатам поиска (дел)
	 */
	backToSearch: function () {
		this.toPage(Pages.scases);
	},
	/**
	 * Включение режима редактирования для дела
	 */
	edit: function () {
		var page = this.view.getActiveItem();
		page.switchEdit(true);
		this.view.showTB(page.tbb);
	},
	/**
	 * Вернуться в дело из добаления документа
	 */
	backToCase: function () {
		this.toPage(Pages.acase);
	},
	/**
	 * Обрабатывает событие удаления дела, документа
	 * @param {Object} args аргументы, передаваемые обработчику
	 *
	 * 	- `page` - {Object} страница с результатами поиска. здесь надо обновить данные.
	 *
	 */
	removeModel: function (args) {
		this.view.getPageByName(args.page).sstore.reload();
	},
	/**
	 * Добавляет или удаляет возможность входа в карточку документа
	 * @param {Object} args аргументы, передоваемые событию:
	 *
	 *	- `flag` - {Boolean} true - включить возможность, false - выключить
	 *	- `scope` - {Object} страница, владеющая виджетом (в данном случае adoc)
	 *
	 */
	toDocEnable: function (args) {
		args.scope.toDocEnable(args.flag, this.toDoc, this);
	},
	/**
	 * Добавляет красные звезочки к требуемым полям формы документа
	 * @param {Object} doc форма документа
	 */
	docRender: function (doc) {
		doc._frm.applyAll('setRequired');
	}
});

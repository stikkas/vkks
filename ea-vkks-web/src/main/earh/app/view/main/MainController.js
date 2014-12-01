Ext.define('Earh.view.main.MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.main',
	requires: [
		'Earh.view.search.Case',
		'Earh.view.search.Doc',
		'Earh.view.work.Case',
		'Earh.view.work.Doc',
		'Earh.model.Graph',
		'Earh.model.Case',
		'Earh.model.Doc'
	],
	init: function () {
		var controller = this,
				subscribers = controller.subscribers = [],
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
		listenersFormPages.form = {validChanged: 'validChanged'};
		listenersFormPages['scases gridpanel'] = {cellclick: 'toCase'};
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
	 * @param {String} page страница, на которую нужно уйти
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
	 * Перенаправление к странице дела
	 */
	toCase: function () {
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
		var idx = 0;
		if (Earh.editRole) {
			switch (prev.$className) {
				case 'Earh.view.home.Home': // подготавливаем ЭФ для создания нового дела
					idx = 3;
					var form = page.items.getAt(0);
					form.applyAll('setRequired');
					page.clear();
					page.model = Ext.create('Earh.model.Case');
					break;
				case 'Earh.view.search.Case':
					idx = 1;
			}
		}
		page.tbb = page.hbtns[idx];
	},
	/**
	 * Устанавливает меню для ЭФ "Документ" и иницализирует ЭФ "Документ"
	 * @param {Object} page ЭФ "Документ"
	 * @param {Object} prev предыдущая ЭФ
	 */
	setDocMenu: function (page, prev) {
		var idx = 1;
		if (prev.$className === 'Earh.view.work.Case') {
			var form = page.items.getAt(0);
			form.applyAll('setRequired');
			form.fireEvent('validChanged', false);
			//--------------Для тестов только-------------------
			var model = Ext.create('Earh.model.Doc');
			model.setGraph(Ext.create('Earh.model.Graph', {id: 10, url: '/file.pdf'}));
			page.model = model;
			//---------------------------------------------------
			page.setGraph();
		}
		idx = 0;
		page.tbb = page.hbtns[idx];
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
	}
});

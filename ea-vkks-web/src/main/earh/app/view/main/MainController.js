
Ext.define('Earh.view.main.MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.main',
	requires: [
		'Earh.view.search.Case',
		'Earh.view.search.Doc',
		'Earh.view.work.Case',
		'Earh.view.work.Doc',
		'Ext.util.Observable',
		'Ext.resizer.Resizer'
	],
	control: {
		acase: {// Форма работы с делом
			activate: 'setCaseMenu',
			backToSearch: 'backToSearch',
			caseChanged: 'caseChanged',
			toMain: 'toMain',
			toDocEn: 'toDocEnable'
		},
		adoc: {
			afterrender: 'docRender',
			backToCase: 'backToCase',
			docChanged: 'docChanged'
		},
		scases: {
			activate: 'updateCases'
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
		controller.listen({component: listenersFormPages,
			controller: {
				docsearch: {
					searchKeyPressed: 'searchKeyPressed',
					editComboPressed: 'editComboPressed',
					editComboChange: 'editComboChange'
				}
			}
		});
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
		this.clear();
	},
	/**
	 * Очищает форму и результаты поиска
	 */
	clear: function () {
		this.view.getActiveItem().clear();
	},
	/**
	 * Перенаправление к странице поиска дел с проверкой несохраненных данных
	 * Из страницы создания дела
	 */
	toCasesSearch1: function () {
		this.updateCaseSearch = false; // Нам не надо перезагружать данные
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
		this.clear();
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
			url: Urls.admLogout,
			failure: function () {
				console.log("Admin logout error:");
				console.log(arguments);
			}
		});

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
	 * Вызывается, когда нажали специальную кнопку на ФИО или Суд combobox
	 * @param {Ext.form.field.ComboBox} combo элемент выстреливший событие
	 * @param {Object} event событие
	 */
	editComboPressed: function (combo, event) {
		if (event.getKey() === event.ENTER) {
			if (combo.getPicker().isVisible()) // Откладываем поиск до изменения значения (см. следующий метод)
				combo.enterV = combo.getValue();
			else {
				combo.setValue(combo.getRawValue());
				this.search();
			}
		} 
	},
	/**
	 * После того как сменили значение в ФИО или Суд по Enter можно начать искать
	 * @param {Ext.form.field.ComboBox} combo ФИО или Суд
	 * @param {String} newValue новое значение
	 * @param {String} oldValue старое значение
	 */
	editComboChange: function (combo, newValue, oldValue) {
		if (oldValue === combo.enterV) {
			delete combo['enterV'];
			this.search();
		}
	},
	/**
	 * Функция поиска дел, документов
	 */
	search: function () {
		this.view.getActiveItem().search();
	},
	/**
	 * Вызывается по нажатию кнопки на форме поиска
	 * @param {Object} field элемент, находящийся в фокусе
	 * @param {Object} event событие нажатия кнопки
	 */
	searchKeyPressed: function (field, event) {
		if (event.getKey() === event.ENTER)
			this.search();
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
		var controller = this,
				page = controller.view.getActiveItem();

		if (!page.model.get('id')) // Нечего удалять
			return;

		var xt = page.xtype,
				isCase = (xt === Pages.acase);
		if (isCase && page.hasDocuments()) {
			showError("Ошибка", "Невозможно удалить дело, в котором содержатся документы");
			return;
		}
		requestToRemove(isCase ? "дело" : "документ", function () {
			controller.view.getActiveItem().remove();
		});
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
		} else if (prev.$className === 'Earh.view.work.Doc') {
			if (this.updateCase) {
				Ext.getStore('caseDocsStore').reload();
				page.loadRecord();
			}
		} else {
			page.switchEdit(false);
		}
		// Сбрасываем флаг обновления в любом случае
		this.updateCase = false;
	},
	/**
	 * Обновляет список найденых дел (при необходимости)
	 */
	updateCases: function () {
		if (this.updateCaseSearch) {
			Ext.getStore('casesStore').reload();
			this.updateCaseSearch = false;
		}
	},
	/**
	 * Выставляет флаг, который указывает, что следует обновить страницу дела.
	 */
	docChanged: function () {
		this.updateCase = true;
	},
	/**
	 * Выставляет флаг, который указывает, что следует обновить страницу поиска дел.
	 */
	caseChanged: function () {
		this.updateCaseSearch = true;
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
	 * Добавляет документ к делу (Создает новый документ)
	 */
	addDoc: function () {
		var controller = this,
				model = controller.view.getActiveItem().model;
		controller.view.setActiveItem(Pages.adoc);
		controller.view.getActiveItem().open(model.get('id'), model.get('title'));
	},
	/**
	 *  Переход на страницу редактирования документа
	 */
	toDoc: function () {
		var controller = this,
				caseId = controller.view.getActiveItem().model.get('id');
		controller.view.setActiveItem(Pages.adoc);
		controller.view.getActiveItem().open(caseId, '', arguments[3].id);
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
	 * Добавляет или удаляет возможность входа в карточку документа
	 * @param {Object} args аргументы, передоваемые событию:
	 *
	 *	- `flag` - {Boolean} true - включить возможность, false - выключить
	 *	- `scope` - {Object} страница, владеющая виджетом (в данном случае acase)
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

Ext.define('Earh.view.main.MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.main',
	requires: [
		'Earh.view.search.Case',
		'Earh.view.search.Doc',
		'Earh.view.case.Case',
		'Earh.view.doc.Doc',
		'Earh.view.graph.GraphView'
	],
//	routes: {
//		login: 'onLogin',
//		home: 'onHome',
//		scases: 'onCasesSearch',
//		caseadd: 'onCaseAdd',
//		docadd: 'onDocAdd',
//		sdocs: 'onDocsSearch'
//	},
	init: function () {
		var listenersFormPages = {};
		for (var o in Pages) {
//	 if (o === 'home')
//	 listenersFormPages[Pages[o]] = {activate: 'hideTB'};
//	 else
			listenersFormPages[Pages[o]] = {activate: 'showTB'};
		}
		this.listen({component: listenersFormPages});
		this.callParent();
	},
//	onHome: function () {
//		this.view.setActiveItem(Pages.home);
//	},
//	onCase: function () {
//		this.view.setActiveItem(Pages.acase);
//	},
//	onDoc: function () {
//		this.view.setActiveItem(Pages.doc);
//	},
//	onLogin: function () {
//		window.location.href = Urls.login;
//	},
//	/**
//	 * Обработчик роутера на страницу поиска дел
//	 */
//	onCasesSearch: function () {
//		this.view.setActiveItem(Pages.scases);
//	},
//	/**
//	 * Обработчик роутера на страницу добавления дела
//	 */
//	onCaseAdd: function () {
//		this.view.setActiveItem(Pages.caseadd);
//	},
//	/**
//	 * Обработчик роутера на страницу добавления дела
//	 */
//	onDocAdd: function () {
//		this.view.setActiveItem(Pages.docadd);
//	},
//	/**
//	 *
//	 */
//	onDocsSearch: function () {
//		this.view.setActiveItem(Pages.sdocs);
//	},
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
	/*
	 * Перенаправление к главной странице
	 */
	toMain: function () {
//		this.redirectTo(Pages.home);
		this.view.setActiveItem(Pages.home);
	},
	/**
	 * Перенаправление  к странице поиска дел
	 */
	toCasesSearch: function () {
//		this.redirectTo(Pages.scases);
		this.view.setActiveItem(Pages.scases);
	},
	/**
	 * Перенаправление к странице добавления дела
	 */
	toCaseAdd: function () {
//		this.redirectTo(Pages.caseadd);
		this.view.setActiveItem(Pages.caseadd);
	},
	/**
	 * Перенаправление к странице добавления документа
	 */
	toDocAdd: function () {
//		this.redirectTo(Pages.docadd);
		this.view.setActiveItem(Pages.docadd);
	},
	/**
	 * Перенаправление к странице поиска документов
	 */
	toDocsSearch: function () {
//		this.redirectTo(Pages.sdocs);
		this.view.setActiveItem(Pages.sdocs);
	},
	/**
	 * Обработчик события нажатия на клавишу "Выход"
	 */
	onExit: function () {
		showAlert("Предупреждение", "Вы точно хотите выйти из приложения?", 'exit', this);
	},
	/**
	 * Завершает работу и перенаправляет пользователя на страницу приветствия,
	 * если пользователь ответил утвердительно, иначе ничего не делает
	 * @param btn {String} кнопка, которую нажал пользователь - `yes` или `no`
	 */
	exit: function (btn) {
		if (btn === "yes")
			window.location.href = Urls.logout;
	}
});

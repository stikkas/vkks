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
	routes: {
		login: 'onLogin',
		acase: 'onCase',
		adoc: 'onDoc',
		home: 'onHome',
		casesearch: 'onCaseSearch',
		docsearch: 'onDocSearch',
		graphview: 'onGraphView'
	},
	init: function () {
		var listenersFormPages = {};
		for (var o in Pages) {
			if (o === 'home')
				listenersFormPages[Pages[o]] = {activate: 'hideTB'};
			else
				listenersFormPages[Pages[o]] = {activate: 'showTB'};
		}
		this.listen({component: listenersFormPages});
		this.callParent();
	},
	onHome: function () {
		this.view.setActiveItem(Pages.home);
	},
	onCase: function () {
		this.view.setActiveItem(Pages.acase);
	},
	onDoc: function () {
		this.view.setActiveItem(Pages.doc);
	},
	onLogin: function () {
		window.location.href = Urls.login;
	},
	onCaseSearch: function () {
		this.view.setActiveItem(Pages.scase);
	},
	onDocSearch: function () {
		this.view.setActiveItem(Pages.sdoc);
	},
	onGraphView: function () {
		this.view.setActiveItem(Pages.vgraph);
	},
	showTB: function (page) {
		this.view.showTB(page.tbb);
	},
	hideTB: function () {
		this.view.hideTB();
	},
	/**
	 * Завершает работу и перенаправляет пользователя на страницу приветствия
	 */
	exit: function () {
		window.location.href = Urls.logout;
	},
	toMain: function () {
		this.redirectTo(Pages.home);
	},
	toDocs: function () {
		this.redirectTo(Pages.sdoc);
	},
	toCases: function () {
		this.redirectTo(Pages.scase);
	}
});

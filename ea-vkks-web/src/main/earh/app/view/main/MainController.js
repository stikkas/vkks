Ext.define('Earh.view.main.MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.main',
	requires: [
		'Earh.view.search.Case',
		'Earh.view.search.Doc',
		'Earh.view.login.Login',
		'Earh.view.case.Case',
		'Earh.view.doc.Doc',
		'Earh.view.graph.GraphView',
		'Earh.view.graphs.Graphs'
	],
	routes: {
		acase: 'onCase',
		adoc: 'onDoc',
		login: 'onLogin',
		home: 'onWelcome',
		welcome: 'onWelcome',
		casesearch: 'onCaseSearch',
		docsearch: 'onDocSearch',
		graphview: 'onGraphView',
		graphs: 'onGraphs'
	},
	init: function () {
		var listenersFormPages = {};
		for (var o in Pages) {
			if (o === 'welcome' || o === 'login')
				listenersFormPages[Pages[o]] = {activate: 'hideTB'};
			else
				listenersFormPages[Pages[o]] = {activate: 'showTB'};
		}
		this.listen({component: listenersFormPages});
		this.callParent();
	},
	onWelcome: function () {
		this.view.setActiveItem(Pages.welcome);
	},
	onCase: function () {
		this.view.setActiveItem(Pages.acase);
	},
	onDoc: function () {
		this.view.setActiveItem(Pages.doc);
	},
	onLogin: function () {
		this.view.setActiveItem(Pages.login);
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
	onGraphs: function () {
		this.view.setActiveItem(Pages.graphs);
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
		window.location.href = Urls.root;
	}
});

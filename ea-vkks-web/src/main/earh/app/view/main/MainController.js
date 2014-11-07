(function () {
	var viewport;
	Ext.define('Earh.view.main.MainController', {
		extend: 'Ext.app.ViewController',
		alias: 'controller.main',
		requires: [
			'Earh.view.login.Login',
			'Earh.view.case.Case'
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
			viewport = this.view;
		},
		onWelcome: function () {
			viewport.setActiveItem(Pages.welcome);
		},
		onCase: function () {
			viewport.setActiveItem(Pages.acase);
		},
		onDoc: function () {
			viewport.setActiveItem(Pages.doc);
		},
		onLogin: function () {
			viewport.setActiveItem(Pages.login);
		},
		onCaseSearch: function () {
			viewport.setActiveItem(Pages.scase);
		},
		onDocSearch: function () {
			viewport.setActiveItem(Pages.sdoc);
		},
		onGraphView: function () {
			viewport.setActiveItem(Pages.vgraph);
		},
		onGraphs: function () {
			viewport.setActiveItem(Pages.graphs);
		},
		showTB: function (page) {
			viewport.showTB(page.tbb);
		},
		hideTB: function () {
			viewport.hideTB();
		},
		/**
		 * Завершает работу и перенаправляет пользователя на страницу приветствия
		 */
		exit: function () {
			window.location.href = Urls.root;
		}
	});
})();

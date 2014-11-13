Ext.define('Login.view.main.MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.main',
	requires: [
		'Login.view.login.Login'
	],
	routes: {
		login: 'onLogin',
		home: 'onWelcome',
		welcome: 'onWelcome'
	},
	onWelcome: function () {
		this.view.setActiveItem(Pages.welcome);
	},
	onLogin: function () {
		this.view.setActiveItem(Pages.login);
	}
});

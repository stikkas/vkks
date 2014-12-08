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
	init: function () {
		this.listen({
			controller: {
				'*': {
					exitEvent: this.exit
				}
			}
		});
	},
	onWelcome: function () {
		this.view.setActiveItem(Pages.welcome);
	},
	onLogin: function () {
		this.view.setActiveItem(Pages.login);
	},
	exit: function () {
//		top.close();
//		open(location, '_self').close();
//		window.close();
		this.redirectTo(Pages.login);
	}
});

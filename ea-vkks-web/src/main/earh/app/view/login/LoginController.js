Ext.define('Earh.view.login.LoginController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.login',
	enter: function () {
		this.redirectTo(Pages.acase);
	}
});


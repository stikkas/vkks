Ext.define('Login.view.welcome.WelcomeController', {
	extend: 'Ext.app.ViewController',
	requires: [
		'Ext.MessageBox'
	],
	alias: 'controller.welcome',
	goToDocuments: function () {
		this.redirectTo(Pages.login);
	},
	goToArmAdmin: function () {
		window.location.href = Urls.armadmin;
	}
});

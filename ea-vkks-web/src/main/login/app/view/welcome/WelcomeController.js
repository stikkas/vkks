Ext.define('Login.view.welcome.WelcomeController', {
	extend: 'Ext.app.ViewController',
	requires: [
		'Ext.MessageBox'
	],
	alias: 'controller.welcome',
	goToDocuments: function () {
		window.location.href = Urls.root;
	},
	goToArmAdmin: function () {
		window.location.href = Urls.armadmin + "?back=" + Urls.logout;
	}
});

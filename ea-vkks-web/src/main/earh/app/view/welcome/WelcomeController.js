Ext.define('Earh.view.welcome.WelcomeController', {
	extend: 'Ext.app.ViewController',
	requires: [
		'Ext.MessageBox'
	],
	alias: 'controller.welcome',
	goToDocuments: function () {
		this.redirectTo(Pages.login);
	},
	goToArmAdmin: function () {
		console.log("goToArmAdmin");
	}
});

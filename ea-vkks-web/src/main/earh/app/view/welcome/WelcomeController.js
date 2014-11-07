(function () {
	var welcomePage;
	Ext.define('Earh.view.welcome.WelcomeController', {
		extend: 'Ext.app.ViewController',
		requires: [
			'Ext.MessageBox'
		],
		alias: 'controller.welcome',
		init: function () {
			welcomePage = this.view;
		},
		goToDocuments: function () {
			this.redirectTo(Pages.login);
		},
		goToArmAdmin: function () {
			console.log("goToArmAdmin");
		}
	});
})();

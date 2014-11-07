(function () {
	var loginPage;
	Ext.define('Earh.view.login.LoginController', {
		extend: 'Ext.app.ViewController',
		alias: 'controller.login',
		init: function () {
			loginPage = this.view;
		},
		enter: function () {
			this.redirectTo(Pages.acase);
		}
	});
})();


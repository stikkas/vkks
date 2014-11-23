/*
 * Страница приветствия (показываются ссылки на два приложения)
 */
Ext.define('Login.view.welcome.Welcome', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.button.Button',
		'Login.view.welcome.WelcomeController'
	],
	alias: 'widget.welcome',
	controller: 'welcome',
	defaults: {
		xtype: 'button'
	},
	initComponent: function () {
		this.items = [{
				text: Trans.docs,
				handler: "goToDocuments"
			}, {
				text: Trans.admin,
				handler: "goToArmAdmin"
			}];
		this.callParent();
	}
});

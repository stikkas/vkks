/*
 * Страница приветствия (показываются ссылки на два приложения)
 */
Ext.define('Earh.view.welcome.Welcome', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.button.Button',
		'Earh.view.welcome.WelcomeController'
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

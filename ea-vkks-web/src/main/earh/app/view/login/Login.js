/*
 * Страница авторизации
 */
Ext.define('Earh.view.login.Login', {
	extend: 'Ext.form.Panel',
	alias: 'widget.login',
	requires: [
		'Ext.layout.container.VBox',
		'Ext.form.field.Text',
		'Earh.view.login.LoginController'
	],
	controller: 'login',
	defaults: {
		xtype: 'textfield',
		labelSeparator: '',
		labelAlign: 'right'
	},
	layout: 'vbox',
	initComponent: function () {
		var loginPage = this;
		loginPage.title = Trans.enter;
		loginPage.items = [
			{fieldLabel: Trans.user},
			{fieldLabel: Trans.pass}
		];
		loginPage.buttons = [{
				text: Trans.tenter,
				handler: 'enter'
			}];
		loginPage.callParent();
	}
});


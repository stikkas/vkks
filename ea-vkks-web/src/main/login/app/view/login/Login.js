/*
 * Страница авторизации
 */
Ext.define('Login.view.login.Login', {
	extend: 'Ext.form.Panel',
	alias: 'widget.login',
	requires: [
		'Ext.layout.container.VBox',
		'Ext.form.field.Text',
		'Login.view.login.LoginController',
		'Ext.button.Button'
	],
	controller: 'login',
        cls:'login_page',
	defaults: {
		xtype: 'textfield',
		labelSeparator: '',
		labelAlign: 'right',
		listeners: {
			specialkey: 'onSpecialKey'
		}
	},
	layout: 'vbox',
	initComponent: function () {
		var loginPage = this;
		loginPage.title = Trans.enter;
		loginPage.items = [{
				fieldLabel: Trans.user,
				name: 'j_username'
			}, {
				fieldLabel: Trans.pass,
				name: 'j_password',
				inputType: 'password'
			}
		];
		loginPage.buttons = [{
				text: Trans.enter,
				handler: 'enter'
			}, {
				text: Trans.exit,
				handler: 'exit'
			}];
		loginPage.callParent();
	}
});


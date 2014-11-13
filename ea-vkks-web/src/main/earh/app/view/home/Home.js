/**
 * Главная страница
 */
Ext.define('Earh.view.home.Home', {
	extend: 'Ext.container.Container',
	alias: 'widget.home',
	requires: [
		'Ext.layout.container.HBox',
		'Ext.button.Button'
	],
	layout: 'hbox',
	defaults: {
		xtype: 'button'
	},
	initComponent: function () {
		this.items = [{
				text: Trans.cases,
				handler: 'toCases'
			}, {
				text: Trans.docs,
				handler: 'toDocs'
			}];
		this.callParent();
	}
});



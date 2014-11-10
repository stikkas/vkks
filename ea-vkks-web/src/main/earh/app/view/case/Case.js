/*
 * Карточка дела
 */
Ext.define('Earh.view.case.Case', {
	extend: 'Ext.container.Container',
	alias: 'widget.acase',
	requires: [
		'Ext.layout.container.VBox',
		'Ext.panel.Panel',
		'Ext.form.field.Text',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.form.field.Number',
		'Ext.form.field.TextArea'
	],
	layout: 'vbox',
	tbb: [1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
	defaults: {
		xtype: 'panel',
		layout: 'vbox',
		width: '100%',
		defaults: {
			labelAlign: 'right',
			labelWidth: 200
		}
	},
	initComponent: function () {
		var caseView = this;
		caseView.items = [{
				title: Trans.acase,
				items: [{
						xtype: 'textfield',
						fieldLabel: Trans.caseNum
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.caseType
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.departmnt
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.startDate
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.endDate
					}, {
						xtype: 'numberfield',
						fieldLabel: Trans.storeLife
					}]
			}, {
				title: Trans.volume,
				items: [{
						xtype: 'textfield',
						fieldLabel: Trans.volumeNum
					}, {
						xtype: 'textarea',
						fieldLabel: Trans.title
					}, {
						xtype: 'numberfield',
						fieldLabel: Trans.pagesCount
					}, {
						xtype: 'textarea',
						fieldLabel: Trans.remark
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.topoRef
					}]
			}];
		caseView.callParent();
	}
});



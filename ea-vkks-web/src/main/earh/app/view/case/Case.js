/*
 * Карточка дела
 */
Ext.define('Earh.view.case.Case', {
	extend: 'Ext.container.Container',
	alias: 'widget.acase',
	requires: [
		'Ext.layout.container.VBox',
		'Ext.panel.Panel',
		'Ext.grid.Panel',
		'Ext.toolbar.Paging',
		'Ext.form.field.Text',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.form.field.Number',
		'Ext.form.field.TextArea',
		'Ext.ux.TreePicker'
	],
	layout: 'vbox',
	// Режим отображения формы
	viewMode: false,
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
						fieldLabel: Trans.storeLife
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.caseTitle
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.startDate
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.endDate
					}, {
						xtype: 'treepicker',
						fieldLabel: Trans.topoRef
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.caseRemark
					}]
			}, {
				title: Trans.caseDocs,
				items: [{
						xtype: 'textfield',
						fieldLabel: Trans.caseDocsSearch
					}, {
						xtype: 'gridpanel',
						store: docsStoreId,
						width: '100%',
						columns: {
							defaults: {
								menuDisabled: true
							},
							items: [{
									text: Trans.volume,
									dataIndex: 'volume'
								}, {
									text: Trans.acase,
									dataIndex: 'acase'
								}, {
									text: Trans.docNum,
									dataIndex: 'docnumber'
								}, {
									text: Trans.docType,
									dataIndex: 'doctype'
								}]
						},
						dockedItems: [{
								xtype: 'pagingtoolbar',
								dock: 'top',
								store: resultStoreId
							}]
					}]
			}];
		caseView.callParent();

		if (caseView.viewMode)
			caseView.tbb = [1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1];
		else
			caseView.tbb = [1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1];
	}
});



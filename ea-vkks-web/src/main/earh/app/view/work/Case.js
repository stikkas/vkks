/*
 * Карточка дела
 */
Ext.define('Earh.view.work.Case', {
	extend: 'Ext.container.Container',
	alias: 'widget.acase',
	requires: [
		'Ext.layout.container.VBox',
		'Ext.panel.Panel',
		'Ext.form.Panel',
		'Ext.grid.Panel',
		'Ext.toolbar.Paging',
		'Ext.form.field.Text',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.form.field.TextArea',
		'Ext.form.trigger.Trigger',
		'Ext.button.Button',
		'Ext.ux.TreePicker',
//		'Earh.store.CaseResult',
		'Earh.store.DocResult'
	],
	layout: 'vbox',
	defaults: {
		xtype: 'panel',
		layout: 'vbox',
		width: '100%'
	},
	initComponent: function () {
		var caseView = this,
				editRole = Earh.editRole
//				docsResult = Ext.create('Earh.store.DocResult', {
//					pageSize: 10
//				});
				;
		console.log(caseView.up('viewport'));
		caseView.items = [{
				xtype: 'form',
				title: Trans.acase,
				defaults: {
					labelAlign: 'right',
					labelWidth: 200,
					viewMode: !editRole
				},
				items: [{
						xtype: 'textfield',
						fieldLabel: Trans.caseNum,
						name: 'casenum'
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.caseType,
						name: 'casetype'
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.storeLife,
						name: 'storelife'
					}, {
						xtype: 'textarea',
						fieldLabel: Trans.caseTitle,
						name: 'casetitle'
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.startDate,
						name: 'startdate'
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.endDate,
						name: 'enddate'
					}, {
						xtype: 'treepicker',
						fieldLabel: Trans.topoRef,
						name: 'toporef'
					}, {
						xtype: 'textarea',
						fieldLabel: Trans.caseRemark,
						name: 'caseremark'
					}],
				dockedItems: [{
						xtype: 'pagingtoolbar',
						dock: 'top',
						displayInfo: false,
						beforePageText: Trans.card,
//						store: caseResult
					}]
			}, {
				title: Trans.caseDocs,
				items: [{
						xtype: 'textfield',
						fieldLabel: Trans.caseDocsSearch,
						name: 'casedocssearch',
						triggers: {
							search: {
//								cls: 'any-class',
								handler: 'searchDocs'
							}
						}
					}, {
						xtype: 'gridpanel',
						store: docsResult,
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
								xtype: 'container',
								dock: 'top',
								layout: 'hbox',
								items: [{
										xtype: 'button',
										text: Trans.add,
										hidden: !editRole
									}, {
										xtype: 'pagingtoolbar',
										store: docsResult,
										displayInfo: false
									}]

							}]
					}]
			}];
		caseView.callParent();

		if (editRole)
			caseView.tbb = [1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1];
		else {
			caseView.applyAll('setRequired');
			caseView.tbb = [1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1];
		}
	}
});



/**
 * Поиск дел
 */
Ext.define('Earh.view.search.Case', {
	extend: 'Earh.view.search.Base',
	alias: 'widget.casesearch',
	requires: [
		'Earh.cmp.TreeComboBox',
		'Earh.store.Case',
		'Earh.store.CaseType',
		'Earh.store.StoreLife',
		'Earh.store.TopoRef',
		'Ext.form.field.Number',
		'Earh.store.Department',
		'Ext.ux.TreePicker'
	],
	tbb: [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
	initComponent: function () {
		var resultStoreId = 'caseStore';
		this.callParent([{
				xtype: 'form',
				title: Trans.caseSearch,
				layout: 'vbox',
				width: '100%',
				defaults: {
					labelWidth: 200,
					labelAlign: 'right',
					labelSeparator: ''
				},
				items: [{
						xtype: 'textfield',
						fieldLabel: Trans.caseNum,
						name: 'caseNum'
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.caseType,
						store: 'caseTypeStore',
						name: 'caseType',
						displayField: 'value',
						valueField: 'id'
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.storeLife,
						name: 'storeLife',
						store: 'storeLifeStore',
						displayField: 'value',
						valueField: 'id'

					}, {
						xtype: 'textfield',
						fieldLabel: Trans.caseTitle,
						name: 'caseTitle'
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.startDate,
						name: 'startDate'
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.endDate,
						name: 'endDate'
					}, {
						xtype: 'treepicker',
						fieldLabel: Trans.topoRef,
						store: Earh.store.TopoRef,
						name: 'topoRef',
						displayField: 'address'
					}, {
						xtype: 'numberfield',
						fieldLabel: Trans.volumeNum,
						name: 'volumeNum'
					}]
			}, {
				xtype: 'gridpanel',
				title: Trans.searchResult,
				store: resultStoreId,
				width: '100%',
				columns: {
					defaults: {
						menuDisabled: true
					},
					items: [{
							text: Trans.type,
							dataIndex: 'type'
						},
						{
							text: Trans.title,
							dataIndex: 'title'
						},
						{
							text: Trans.volumesCount,
							dataIndex: 'volumesCount'
						},
						{
							text: Trans.dates,
							dataIndex: 'dates'
						}],
				},
				dockedItems: [{
						xtype: 'pagingtoolbar',
						dock: 'top',
						beforePageText: '',
						store: resultStoreId
					}]
			}]);
	}
});




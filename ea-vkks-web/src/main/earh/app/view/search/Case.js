/**
 * Поиск дел
 */
Ext.define('Earh.view.search.Case', {
	extend: 'Earh.view.search.Base',
	alias: 'widget.casesearch',
	requires: [
		'Earh.cmp.NumberInterval',
		'Earh.store.Case',
		'Earh.store.Department'
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
					labelAlign: 'right'
				},
				items: [{
						xtype: 'combobox',
						fieldLabel: Trans.caseType,
						store: 'caseTypeStore',
						name: 'caseType'
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.departmnt,
						store: 'departmentStore',
						name: 'department'
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.caseNum,
						name: 'caseNum'
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.caseTitle,
						name: 'caseTitle'
					},
					Ext.create('Earh.cmp.NumberInterval', Trans.volumesCount,
							'fromVolumeCount', 'toVolumeCount', '',
							{labelWidth: 20, labelAlign: 'right', width: 75}),
					{
						xtype: 'datefield',
						fieldLabel: Trans.startDate,
						name: 'startDate'
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.endDate,
						name: 'endDate'
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.storeLife,
						name: 'storeLife'
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




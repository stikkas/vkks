/**
 * Поиск документов
 */
Ext.define('Earh.view.search.Doc', {
	extend: 'Earh.view.search.Base',
	alias: 'widget.docsearch',
	requires: [
		'Earh.store.Doc'
	],
	initComponent: function () {
		var resultStoreId = 'docStore';
		this.callParent([{
				xtype: 'form',
				title: Trans.docSearch,
				layout: 'vbox',
				width: '100%',
				defaults: {
					labelWidth: 200,
					labelAlign: 'right'
				},
				items: [{
						xtype: 'textfield',
						fieldLabel: Trans.caseNum,
						name: 'caseNum'
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.volumeNum,
						name: 'volumeNum'
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.caseType,
						store: 'caseTypeStore',
						name: 'caseType'
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.docDate,
						name: 'docDate'
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.docTitle,
						name: 'docTitle'
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.whoSign,
						name: 'whoSign'
					}, {
						xtype: 'textarea',
						fieldLabel: Trans.textSearch,
						name: 'textSearch'
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
						}, {
							text: Trans.docNum,
							dataIndex: 'docNum'
						}, {
							text: Trans.dates,
							dataIndex: 'dates'
						}, {
							text: Trans.title,
							dataIndex: 'title'
						}]
				},
				dockedItems: [{
						xtype: 'pagingtoolbar',
						dock: 'top',
						beforePageText: '',
						store: resultStoreId
					}]
			}]);
		this.tbb = [1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1];
	}
});





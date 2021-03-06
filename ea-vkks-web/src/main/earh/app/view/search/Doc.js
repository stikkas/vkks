/**
 * Поиск документов
 */
Ext.define('Earh.view.search.Doc', {
	extend: 'Earh.view.search.Base',
	alias: 'widget.sdocs',
	controller: 'docsearch',
	requires: [
		'Earh.store.DocResult',
		'Earh.store.DocType',
		'Ext.grid.column.Action',
		'Ext.form.FieldContainer',
		'Earh.model.DocsQuery',
		'Earh.view.search.DocController',
		'Earh.cmp.AutoComplete'
	],
	tbb: [1, // Главная
		0, // Вернуться к результатам поиска
		0, // Вернуться в дело
		1, // пробел
		0, // Поиск дел
		1, // Поиск
		1, // Очистить
		0, // Сохранить
		0, // Удалить
		0, // Редактировать
		1, // сдвиг вправо
		1, // ФИО
		1, // разделитель
		1], // Выход
	initComponent: function () {
		//-----for staff use only------------
		function emptyCombo(cb, value) {
			if (!value)
				cb.reset();
		}
		//-----------------------------------
		var searchDocView = this,
				resultStoreId ='docsStore';

		searchDocView.callParent([{
				xtype: 'form',
				title: Trans.docSearch,
				layout: 'vbox',
				width: '100%',
				cls: 'section_panel',
				defaults: {
					labelWidth: 400,
					labelAlign: 'right',
					listeners: {
						specialkey: "searchKeyPressed"
					}
				},
				items: [/*{
				 xtype: 'numberfield',
				 fieldLabel: Trans.volumeNum,
				 name: 'volume',
				 width: 515
				 }, */{
						xtype: 'textfield',
						fieldLabel: Trans.docNum,
						name: 'number',
						width: 515
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.docType,
						store: 'docTypeStoreEm',
						name: 'type',
						displayField: 'name',
						valueField: 'id',
						listeners: {
							change: emptyCombo,
							specialkey: "searchKeyPressed"
						},
						width: 985
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.docTitle,
						name: 'title',
						width: 985
					}, /* {
					 xtype: 'numberfield',
					 fieldLabel: Trans.startPageNum,
					 name: 'startPage',
					 width: 515
					 }, {
					 xtype: 'numberfield',
					 fieldLabel: Trans.endPageNum,
					 name: 'endPage',
					 width: 515
					 }, */{
						xtype: 'fieldcontainer',
						fieldLabel: Trans.docDate,
						labelSeparator: '',
						width: 775,
						layout: 'hbox',
						defaults: {
							cls: 'marl-15',
							xtype: 'datefield',
							listeners: {
								specialkey: "searchKeyPressed"
							}
						},
						items: [{
								fieldLabel: "с",
								name: 'startDate',
								labelWidth: 10,
								width: 140
							}, {
								fieldLabel: "по",
								name: 'endDate',
								labelWidth: 20,
								width: 150
							}]
					}, {
						xtype: 'autocombo',
						fieldLabel: Trans.court,
						name: 'court',
						store: 'courtsStore',
						listeners: {
							specialkey: "editComboPressed"
						},
						width: 735
					}, {
						xtype: 'autocombo',
						fieldLabel: Trans.fio,
						name: 'fio',
						store: 'fiosStore',
						listeners: {
							specialkey: "editComboPressed"
						},
						width: 735
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.remark,
						name: 'remark',
						width: 985
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.ctxSearch,
						name: 'context',
						width: 985
					}]
			}, {
				xtype: 'gridpanel',
				title: Trans.searchResult,
				store: resultStoreId,
				width: '100%',
				cls: 'section_panel doc_search',
				listeners: {
					cellclick: 'cellClicked'
				},
				columns: {
					defaults: {
						menuDisabled: true,
						renderer: tipRenderer
					},
					items: [{
							text: Trans.caseNum,
							dataIndex: 'acase',
							flex: 0.5,
							renderer: 'caseRenderer'
//							width: '5%'
						}, {
							text: Trans.topoRef,
							dataIndex: 'toporef',
							flex: 1,
							renderer: 'caseRenderer'
						}, {
							text: Trans.docNum_,
							dataIndex: 'number',
							flex: 0.8
//							width: '8%'
						}, {
							text: Trans.docType,
							dataIndex: 'type',
							flex: 1
//							width: '15%'
						}, {
							text: Trans.docTitle,
							dataIndex: 'title',
							flex: 1.7
//							width: '30%'
						}, {
							text: Trans.pagesCount,
							dataIndex: 'pages',
//							width: '8%'
							flex: 0.8
						}, {
							text: Trans.docDate,
							dataIndex: 'date',
							sortable: false,
							flex: 0.8
//							width: '8%'
						}, {
							text: Trans.court,
							dataIndex: 'court',
							flex: 1
//							width: '10.6%'
						}, {
							text: Trans.fio,
							dataIndex: 'fio',
							flex: 1
//							width: '10%'
						}, graphLinkColumn]
				},
				dockedItems: [{
						xtype: 'pagingtoolbar',
						dock: 'top',
						store: resultStoreId
					}]
			}]);
		searchDocView.model = Ext.create('Earh.model.DocsQuery');
//		searchDocView.sstore = Ext.getStore(resultStoreId);
	}
});

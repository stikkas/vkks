/**
 * Поиск документов
 */
Ext.define('Earh.view.search.Doc', {
	extend: 'Earh.view.search.Base',
	alias: 'widget.sdocs',
	requires: [
		'Earh.store.DocResult',
		'Earh.store.DocType',
		'Earh.store.FioResult',
		'Earh.store.CourtResult',
		'Ext.form.field.Number',
		'Ext.grid.column.Action'
	],
	tbb: [1, // Главная
		0, // Вернуться к результатам поиска
		0, // Вернуться в дело
		1, // пробел
		1, // Поиск
		0, // Сохранить
		0, // Удалить
		0, // Редактировать
		1, // сдвиг вправо
		1, // ФИО
		1, // разделитель
		1], // Выход
	initComponent: function () {
		var resultStoreId = 'docsStore';
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
						xtype: 'numberfield',
						fieldLabel: Trans.volumeNum,
						name: 'volume'
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.docNum,
						name: 'number'
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.docType,
						store: 'docTypeStore',
						name: 'type',
						displayField: 'value',
						valueField: 'id'
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.docTitle,
						name: 'title'
					}, {
						xtype: 'numberfield',
						fieldLabel: Trans.startPageNum,
						name: 'startPage'
					}, {
						xtype: 'numberfield',
						fieldLabel: Trans.endPageNum,
						name: 'endPage'
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.docDate,
						name: 'date'
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.court,
						name: 'court',
						store: 'courtsStore',
						valueField: 'court',
						displayField: 'court',
						queryMode: 'local',
						editable: true
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.remark,
						name: 'remark'
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.fio,
						name: 'fio',
						store: 'fiosStore',
						valueField: 'fio',
						displayField: 'fio',
						queryMode: 'local',
						editable: true
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.ctxSearch,
						name: 'context'
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
							text: Trans.caseNum,
							dataIndex: 'acase'
						}, {
							text: Trans.docNum_,
							dataIndex: 'number'
						}, {
							text: Trans.docType,
							dataIndex: 'type'
						}, {
							text: Trans.docTitle,
							dataIndex: 'title'
						}, {
							text: Trans.pages,
							dataIndex: 'pages'
						}, {
							text: Trans.docDate,
							dataIndex: 'date'
						}, {
							text: Trans.court,
							dataIndex: 'court'
						}, {
							text: Trans.fio,
							dataIndex: 'fio'
						}, graphLinkColumn]
				},
				dockedItems: [{
						xtype: 'pagingtoolbar',
						dock: 'top',
						store: resultStoreId
					}]
			}]);
	},
	/**
	 * Поиск документов
	 */
	search: function () {
		var panels = this.items;
//		panels.getAt(1).getStore().loadPage(1, {
////			params: {q: Ext.encode(panels.getAt(0).getValues(true, false))}
//			params: {q: Ext.encode(panels.getAt(0).getValues())}
//		});
		panels.getAt(1).getStore().loadData([{
				id: 1, acase: '18', number: '102', type: 'Правое',
				title: 'Справка с работы',
				pages: '1-10',
				date: '11.01.2011', court: 'Московский областной суд',
				fio: 'Петровс С.И.',
				graph: '/ea-vkks-web/file.pdf'
			}, {
				id: 2, acase: '28', number: '432', type: 'Модное',
				title: 'Справка с учебы',
				pages: '11-20',
				date: '16.11.2013', court: 'Московский областной суд',
				fio: 'Петровс С.И.',
				graph: null
			}]);
	}
});

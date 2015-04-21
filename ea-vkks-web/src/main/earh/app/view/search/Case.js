/**
 * Поиск дел
 */
Ext.define('Earh.view.search.Case', {
	extend: 'Earh.view.search.Base',
	alias: 'widget.scases',
	requires: [
		'Ext.ux.TreePicker',
		'Earh.model.CasesQuery',
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
		function emptyCombo(cb, value) {
			if (value === 0)
				cb.reset();
		}
		var resultStoreId = 'casesStore';
		this.callParent([{
				xtype: 'form',
				cls: 'section_panel',
				title: Trans.caseSearch,
				layout: 'vbox',
				width: '100%',
				defaults: {
					labelWidth: 400,
					listeners: {
						specialkey: "searchKeyPressed"
					}
				},
				items: [{
						xtype: 'container',
						layout: 'hbox',
						cls: 'padt5 padb5',
						items: [{
								xtype: 'autocombo',
								fieldLabel: Trans.numPrefix,
								name: 'numPrefix',
								store: 'caseTypeIndex',
								enforceMaxLength: true,
								maxLength: 3,
								listeners: {
									specialkey: "editComboPressed"
								},
								labelWidth: 400,
								width: 490
							}, {
								xtype: 'numberfield',
								enforceMaxLength: true,
								maxLength: 5,
								fieldLabel: Trans.numNumber,
								listeners: {
									specialkey: "searchKeyPressed"
								},
								name: 'numNumber',
								labelWidth: 150,
								width: 220
							}]
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.caseType,
						store: 'caseTypeStoreEm',
						name: 'type',
						displayField: 'name',
						valueField: 'id',
						listeners: {
							change: emptyCombo,
							specialkey: "searchKeyPressed"
						},
						width: 775
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.storeLife,
						name: 'storeLife',
						store: 'storeLifeStoreEm',
						displayField: 'name',
						valueField: 'id',
						listeners: {
							change: emptyCombo,
							specialkey: "searchKeyPressed"
						},
						width: 675
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.caseTitle,
						name: 'title',
						width: 985
					}, {
						xtype: 'container',
						layout: 'hbox',
						defaults: {
							xtype: 'datefield',
							listeners: {
								specialkey: "searchKeyPressed"
							}
						},
						items: [{
								fieldLabel: Trans.startDate,
								name: 'startDate',
								labelWidth: 400,
								width: 535
							}, {
								fieldLabel: Trans.endDate,
								labelWidth: 160,
								name: 'endDate',
								width: 300
							}]
					}, {
						xtype: 'container',
						cls: 'padt5 padb5',
						defaults: {
							xtype: 'autocombo',
							labelWidth: 400,
							width: 735,
							listeners: {
								specialkey: "editComboPressed"
							}
						},
						items: [{
								fieldLabel: Trans.court,
								name: 'court',
								store: 'courtsStore'
							}, {
								fieldLabel: Trans.fio,
								name: 'fio',
								store: 'fiosStore'
							}]
					}, {
						xtype: 'treepicker',
						fieldLabel: Trans.topoRef,
						store: Ext.getStore('topoRefStoreEm'),
						name: 'toporef',
						width: 985
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.remark,
						name: 'remark',
						width: 985
					}]
			}, {
				xtype: 'gridpanel',
				title: Trans.searchResult,
				cls: 'section_panel case_search',
				store: resultStoreId,
				width: '99%',
				listeners: {
					cellclick: 'toCase'
				},
				columns: {
					defaults: {
						menuDisabled: true,
						renderer: tipRenderer
					},
					items: [{
							text: Trans.caseNum_,
							dataIndex: 'number',
							flex: 0.61
						},
						{
							text: Trans.caseType,
							dataIndex: 'type',
							flex: 2
						},
						{
							text: Trans.storeLife,
							dataIndex: 'storeLife',
							flex: 1
						}, {
							text: Trans.caseTitle,
							dataIndex: 'title',
							flex: 2
						}, {
							text: Trans.dates,
							dataIndex: 'dates',
							sortable: false,
							flex: 1.4
						}, {
							text: Trans.topoRef,
							dataIndex: 'toporef',
							flex: 2
						}, {
							text: Trans.remark,
							dataIndex: 'remark',
							flex: 1
						}]
				},
				dockedItems: [{
						xtype: 'pagingtoolbar',
						dock: 'top',
						store: resultStoreId
					}]
			}]);
		this.model = Ext.create('Earh.model.CasesQuery');
//		this.sstore = Ext.getStore(resultStoreId);
	},
	/**
	 * Очистка формы перед использованием
	 */
	clear: function () {
		this._frm.items.getAt(6).initPicker();
		this.callParent();
	}
});




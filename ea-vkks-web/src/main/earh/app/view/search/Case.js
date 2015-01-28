/**
 * Поиск дел
 */
Ext.define('Earh.view.search.Case', {
	extend: 'Earh.view.search.Base',
	alias: 'widget.scases',
	requires: [
		'Ext.ux.TreePicker',
		'Earh.model.CasesQuery'
	],
	tbb: [1, // Главная
		0, // Вернуться к результатам поиска
		0, // Вернуться в дело
		1, // пробел
		0, // Поиск дел
		1, // Поиск
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
		function emptyCombo2(cb) {
			if (!cb.getRawValue())
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
					labelWidth: 400
				},
				items: [{
						xtype: 'textfield',
						fieldLabel: Trans.caseNum,
						name: 'number',
						width: 515
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.caseType,
						store: 'caseTypeStoreEm',
						name: 'type',
						displayField: 'name',
						valueField: 'id',
						listeners: {change: emptyCombo},
						width: 775
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.storeLife,
						name: 'storeLife',
						store: 'storeLifeStoreEm',
						displayField: 'name',
						valueField: 'id',
						listeners: {change: emptyCombo},
						width: 675
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.caseTitle,
						name: 'title',
						width: 985
					}, {
						xtype: 'container',
						layout: 'hbox',
						items: [{
								xtype: 'datefield',
								fieldLabel: Trans.startDate,
								name: 'startDate',
								labelWidth: 400,
								width: 535
							}, {
								xtype: 'datefield',
								fieldLabel: Trans.endDate,
								labelWidth: 185,
								name: 'endDate',
								width: 315
							}]
					}, {
						xtype: 'container',
						layout: 'hbox',
                                                cls:'padt5 padb5',
						items: [
							{
								xtype: 'combobox',
								fieldLabel: Trans.court,
								name: 'court',
								store: 'courtsStore',
								minChars: 1,
								editable: true,
								listeners: {blur: emptyCombo2},
								labelWidth: 400,
								width: 650
							}, {
								xtype: 'combobox',
								fieldLabel: Trans.fio,
								name: 'fio',
								store: 'fiosStore',
								minChars: 1,
								editable: true,
								listeners: {blur: emptyCombo2},
								labelWidth: 70,
								width: 324
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
							flex:0.61
						},
						{
							text: Trans.caseType,
							dataIndex: 'type',
							flex:2
						},
						{
							text: Trans.storeLife,
							dataIndex: 'storeLife',
							flex:1
						}, {
							text: Trans.caseTitle,
							dataIndex: 'title',
							flex:2
						}, {
							text: Trans.dates,
							dataIndex: 'dates',
							flex:1.4
						}, {
							text: Trans.topoRef,
							dataIndex: 'toporef',
							flex:2
						}, {
							text: Trans.remark,
							dataIndex: 'remark',
							flex:1
						}]
				},
				dockedItems: [{
						xtype: 'pagingtoolbar',
						dock: 'top',
						store: resultStoreId
					}]
			}]);
		this.model = Ext.create('Earh.model.CasesQuery');
		this.sstore = Ext.getStore(resultStoreId);
	},
	/**
	 * Очистка формы перед использованием
	 */
	clear: function () {
		this._frm.items.getAt(6).initPicker();
		this.callParent();
	}
});




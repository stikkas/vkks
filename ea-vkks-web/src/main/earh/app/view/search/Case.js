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
						xtype: 'datefield',
						fieldLabel: Trans.startDate,
						name: 'startDate',
						width: 535
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.endDate,
						name: 'endDate',
						width: 535
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
				width: '100%',
				listeners: {
					cellclick: 'toCase'
				},
				columns: {
					defaults: {
						menuDisabled: true
					},
					items: [{
							text: Trans.caseNum_,
							dataIndex: 'number',
							width: '5%'
						},
						{
							text: Trans.caseType,
							dataIndex: 'type',
							width: '20%'
						},
						{
							text: Trans.storeLife,
							dataIndex: 'storeLife',
							width: '10%'
						}, {
							text: Trans.caseTitle,
							dataIndex: 'title',
							width: '20%'
						}, {
							text: Trans.dates,
							dataIndex: 'dates',
							width: '14%'
						}, {
							text: Trans.topoRef,
							dataIndex: 'toporef',
							width: '20%'
						}, {
							text: Trans.remark,
							dataIndex: 'remark',
							width: '10.5%'
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




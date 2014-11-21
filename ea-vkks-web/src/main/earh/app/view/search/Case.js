/**
 * Поиск дел
 */
Ext.define('Earh.view.search.Case', {
	extend: 'Earh.view.search.Base',
	alias: 'widget.scases',
	requires: [
		'Earh.cmp.TreeComboBox',
		'Earh.store.CaseResult',
		'Earh.store.CaseType',
		'Earh.store.StoreLife',
		'Earh.store.TopoRef',
		'Ext.ux.TreePicker'
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
		var resultStoreId = 'casesStore';
		this.callParent([{
				xtype: 'form',
				title: Trans.caseSearch,
				layout: 'vbox',
				width: '100%',
				defaults: {
					labelWidth: 200
				},
				items: [{
						xtype: 'textfield',
						fieldLabel: Trans.caseNum,
						name: 'number'
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.caseType,
						store: 'caseTypeStore',
						name: 'type',
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
						name: 'title'
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
						name: 'toporef',
						displayField: 'address'
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.remark,
						name: 'remark'
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
							dataIndex: 'number'
						},
						{
							text: Trans.caseType,
							dataIndex: 'type'
						},
						{
							text: Trans.storeLife,
							dataIndex: 'storeLife'
						}, {
							text: Trans.caseTitle,
							dataIndex: 'title'
						}, {
							text: Trans.dates,
							dataIndex: 'dates'
						}, {
							text: Trans.topoRef,
							dataIndex: 'toporef'
						}, {
							text: Trans.remark,
							dataIndex: 'remark'
						}]
				},
				dockedItems: [{
						xtype: 'pagingtoolbar',
						dock: 'top',
						store: resultStoreId
					}]
			}]);
	},
	/**
	 * Поиск дел
	 */
	search: function () {
		var panels = this.items;
//		panels.getAt(1).getStore().loadPage(1, {
////			params: {q: Ext.encode(panels.getAt(0).getValues(true, false))}
//			params: {q: Ext.encode(panels.getAt(0).getValues())}
//		});
		panels.getAt(1).getStore().loadData([{
				id: 1, number: '102', type: 'Правое',
				storeLife: 'Вечного хранения',
				title: 'О пропавшей раковине',
				dates: '11.01.2001-12.04.2014', toporef: 'ком. 1, ст. 1, п. 3',
				remark: 'Надо подумать'
			}, {
				id: 2, number: '194', type: 'Левое',
				storeLife: 'Вечного хранения',
				title: 'О найденой руковичке',
				dates: '11.11.2011-12.06.2013', toporef: 'ком. 10, ст. 3, п. 1',
				remark: 'Все сделано за нас'
			}]);
	}
});




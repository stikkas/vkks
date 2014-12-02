/**
 * Поиск дел
 */
Ext.define('Earh.view.search.Case', {
	extend: 'Earh.view.search.Base',
	alias: 'widget.scases',
	requires: [
		'Earh.store.CaseResult',
		'Earh.store.CaseType',
		'Earh.store.StoreLife',
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
						store: 'caseTypeStore',
						name: 'type',
						displayField: 'value',
						valueField: 'id',
						width: 775
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.storeLife,
						name: 'storeLife',
						store: 'storeLifeStore',
						displayField: 'value',
						valueField: 'id',
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
						store: Ext.getStore('topoRefStore'),
						name: 'toporef',
						width: 835
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.remark,
						name: 'remark',
						width: 985
					}]
			}, {
				xtype: 'gridpanel',
				title: Trans.searchResult,
				cls: 'section_panel',
				store: resultStoreId,
				width: '100%',
				columns: {
					defaults: {
						menuDisabled: true
					},
					items: [{
							text: Trans.caseNum_,
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
		this._rslt.store.loadPage(1, {
//		params: {q: Ext.encode(panels.getAt(0).getValues(true, false))}
			params: {
				q: Ext.encode(this._frm.getValues())
			}
		});
		/*
		 var item = {
		 id: 1, number: '102', type: 'Правое',
		 storeLife: 'Вечного хранения',
		 title: 'О пропавшей раковине',
		 dates: '11.01.2001-12.04.2014', toporef: 'ком. 1, ст. 1, п. 3',
		 remark: 'Надо подумать'
		 },
		 items = [];
		 for (var i = 0; i < 100; ++i) {
		 items.push(item);
		 item = Ext.decode(Ext.encode(item));
		 item.id++;
		 item.number = '' + (parseInt(item.number) + 1);
		 }
		 this._rslt.store.loadData(items);
		 */
	},
	clear: function () {
		this._frm.items.getAt(6).initPicker();
		this.callParent();
	}
});




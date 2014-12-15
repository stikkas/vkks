/**
 * Поиск документов
 */
Ext.define('Earh.view.search.Doc', {
	extend: 'Earh.view.search.Base',
	alias: 'widget.sdocs',
	requires: [
		'Earh.store.DocResult',
		'Earh.store.DocType',
		'Ext.form.field.Number',
		'Ext.grid.column.Action',
		'Earh.model.DocsQuery'
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
		//-----for staff use only------------
		function emptyCombo(cb, value) {
			if (!value)
				cb.reset();
		}
		function emptyCombo2(cb) {
			if (!cb.getRawValue())
				cb.reset();
		}
		//-----------------------------------
		var resultStoreId = Ext.create('Earh.store.DocResult');
		this.callParent([{
				xtype: 'form',
				title: Trans.docSearch,
				layout: 'vbox',
				width: '100%',
				cls: 'section_panel',
				defaults: {
					labelWidth: 400,
					labelAlign: 'right'
				},
				items: [{
						xtype: 'numberfield',
						fieldLabel: Trans.volumeNum,
						name: 'volume',
						width: 515
					}, {
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
						listeners: {change: emptyCombo},
						width: 985
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.docTitle,
						name: 'title',
						width: 985
					}, {
						xtype: 'numberfield',
						fieldLabel: Trans.startPageNum,
						name: 'startPage',
						width: 515
					}, {
						xtype: 'numberfield',
						fieldLabel: Trans.endPageNum,
						name: 'endPage',
						width: 515
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.docDate,
						name: 'date',
						width: 535
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.court,
						name: 'court',
						store: 'courtsStore',
						minChars: 1,
						editable: true,
						listeners: {blur: emptyCombo2},
						width: 775
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.remark,
						name: 'remark',
						width: 985
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.fio,
						name: 'fio',
						store: 'fiosStore',
						minChars: 1,
						editable: true,
						listeners: {blur: emptyCombo2},
						width: 775
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
				columns: {
					defaults: {
						menuDisabled: true
					},
					items: [{
							text: Trans.caseNum,
							dataIndex: 'acase',
							width: '5%'
						}, {
							text: Trans.docNum_,
							dataIndex: 'number',
							width: '8%'
						}, {
							text: Trans.docType,
							dataIndex: 'type',
							width: '15%'
						}, {
							text: Trans.docTitle,
							dataIndex: 'title',
							width: '30%'
						}, {
							text: Trans.pages,
							dataIndex: 'pages',
							width: '8%'
						}, {
							text: Trans.docDate,
							dataIndex: 'date',
							width: '8%'
						}, {
							text: Trans.court,
							dataIndex: 'court',
							width: '10.6%'
						}, {
							text: Trans.fio,
							dataIndex: 'fio',
							width: '10%'
						}, graphLinkColumn]
				},
				dockedItems: [{
						xtype: 'pagingtoolbar',
						dock: 'top',
						store: resultStoreId
					}]
			}]);
		this.model = Ext.create('Earh.model.DocsQuery');
	},
	/**
	 * Поиск документов
	 */
	search: function () {
		var searchDocsView = this,
				store = searchDocsView._rslt.store,
				criteria = {},
				model = searchDocsView.model;
		searchDocsView._frm.updateRecord(model);
		var data = model.data;
		for (var o in data)
			if (o !== 'id')
				criteria[o] = data[o];

		store.loadPage(1, {
//			params: {q: Ext.encode(panels.getAt(0).getValues(true, false))}
			params: {q: Ext.encode(criteria)}
		});
		/*
		 this._rslt.store.loadData([{
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
		 */
	}
});

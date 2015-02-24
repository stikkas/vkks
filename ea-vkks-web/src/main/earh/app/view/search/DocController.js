/** 
 * Обрабатывает события связанные с таблицей результатов поиска документов
 */
Ext.define('Earh.view.search.DocController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.docsearch',
	requires: 'Ext.window.Window',
	/**
	 * Настраивает отображение ячеек с информацие о деле
	 * @param {String} value значение ячейчки
	 * @param {Object} metaData объект с настройками
	 */
	caseRenderer: function (value, metaData) {
		metaData.tdCls = 'case-of-doc-cell';
		return tipRenderer(value, metaData);
	},
	/**
	 * Показывает окошко с данными о деле при щелчке по ячейки 
	 * с номером дела или топографическому указателю
	 * @param {Object} grid сетка (не используется)
	 * @param {Object} cell ячейка (не используется)
	 * @param {Number} idx номер колонки таблицы (начинается с 0)
	 * @param {Model} rec модель с данными
	 */
	cellClicked: function (grid, cell, idx, rec) {
		if (idx === 0 || idx === 1) {
			var id = rec.get('caseId'),
					temp;
			Earh.model.Case.getProxy().setUrl(Urls.scase);
			Earh.model.Case.load(id, {
				success: function (model, operation) {
					var form = Ext.create('Ext.form.Panel', {
						layout: 'vbox',
						padding: 10,
						defaults: {
							readOnly: true,
							labelSeparator: ':',
							width: '100%',
							padding: 0,
							labelWidth: 220
						},
						items: [{
								xtype: 'textfield',
								fieldLabel: Trans.caseNum,
								value: rec.get('acase')
							}, {
								xtype: 'textfield',
								fieldLabel: Trans.caseType,
								value: (temp = Ext.getStore('caseTypeStore').getById(model.get('type'))) ? temp.get('name') : ''
//								store: 'caseTypeStore',
//								displayField: 'name',
//								valueField: 'id',
//								name: 'type'
							}, {
								xtype: 'textfield',
								fieldLabel: Trans.storeLife,
								value: (temp = Ext.getStore('storeLifeStore').getById(model.get('storeLife'))) ? temp.get('name') : ''
//								store: 'storeLifeStore',
//								valueField: 'id',
//								displayField: 'name',
//								name: 'storeLife'
							}, {
								xtype: 'textarea',
								fieldLabel: Trans.caseTitle,
								value: model.get('title')
//								name: 'title'
							}, {
								xtype: 'datefield',
								fieldLabel: Trans.startDate,
								value: model.get('startDate')
//								name: 'startDate'
							}, {
								xtype: 'datefield',
								fieldLabel: Trans.endDate,
								value: model.get('endDate')
//								name: 'endDate'
							}, {
								xtype: 'textfield',
								fieldLabel: Trans.topoRef,
								value: (temp = Ext.getStore('topoRefStore').getNodeById(model.get('toporef'))) ? temp.get('path') : ''
								/*
								xtype: 'treepicker',
								fieldLabel: Trans.topoRef,
								name: 'toporef',
								store: Ext.getStore('topoRefStore')
								*/
							}, {
								xtype: 'textarea',
								fieldLabel: Trans.caseRemark,
								value: model.get('remark')
//								name: 'remark'
							}]
					});
//					form.loadRecord(model);
					Ext.create('Ext.window.Window', {
						title: 'Данные о деле',
						height: 350,
						width: 670,
						layout: 'fit',
						items: [form]
					}).show();

				},
				failure: function (r, ans) {
					showError("Ошибка", ans.error.statusText);
				}
			});
		}
	},
	/**
	 * Перенаправление конроллеру родительского виджета
	 */
	searchKeyPressed: function () {
		this.fireEventArgs('searchKeyPressed', arguments);
	},
	editComboChange: function () {
		this.fireEventArgs('editComboChange', arguments);
	},
	editComboPressed: function () {
		this.fireEventArgs('editComboPressed', arguments);
	}
	//----------------------------------------------------
});



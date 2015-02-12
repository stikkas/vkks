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
			var id = rec.get('caseId');
			Earh.model.Case.getProxy().setUrl(Urls.scase);
			Earh.model.Case.load(id, {
				success: function (model, operation) {
					var form = Ext.create('Ext.form.Panel', {
						layout: 'vbox',
						defaults: {
							readOnly: true,
							labelSeparator: ':',
							labelWidth: 150,
							width: '100%'
						},
						items: [{
								xtype: 'textfield',
								fieldLabel: Trans.caseNum,
								name: 'number'
//						width: 515
							}, {
								xtype: 'combobox',
								fieldLabel: Trans.caseType,
								store: 'caseTypeStore',
								displayField: 'name',
								valueField: 'id',
								name: 'type'
//						width: 775
							}, {
								xtype: 'combobox',
								fieldLabel: Trans.storeLife,
								store: 'storeLifeStore',
								valueField: 'id',
								displayField: 'name',
								name: 'storeLife'
//						width: 675
							}, {
								xtype: 'textarea',
								fieldLabel: Trans.caseTitle,
								name: 'title'
//						width: 985
							}, {
								xtype: 'datefield',
								fieldLabel: Trans.startDate,
								name: 'startDate'
//						width: 515
							}, {
								xtype: 'datefield',
								fieldLabel: Trans.endDate,
								name: 'endDate'
//						width: 515
							}, {
								xtype: 'treepicker',
								fieldLabel: Trans.topoRef,
								name: 'toporef',
								store: Ext.getStore('topoRefStore')
//						width: 985
							}, {
								xtype: 'textarea',
								fieldLabel: Trans.caseRemark,
								name: 'remark'
//						width: 985
							}]
					});
					form.loadRecord(model);
					Ext.create('Ext.window.Window', {
						title: 'Данные о деле',
						height: 400,
						width: 400,
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



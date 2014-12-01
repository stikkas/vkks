/*
 * Карточка дела
 */
Ext.define('Earh.view.work.Case', {
	extend: 'Ext.container.Container',
	alias: 'widget.acase',
	requires: [
		'Ext.layout.container.VBox',
		'Ext.panel.Panel',
		'Ext.form.Panel',
		'Ext.grid.Panel',
		'Ext.toolbar.Paging',
		'Ext.form.field.Text',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.form.field.TextArea',
		'Ext.form.trigger.Trigger',
		'Ext.button.Button',
		'Ext.ux.TreePicker',
		'Earh.store.TopoRef',
		'Earh.store.CaseType',
		'Earh.store.StoreLife',
		'Earh.store.CaseDocResult',
		'Earh.model.Case'
	],
	layout: 'vbox',
	defaults: {
		xtype: 'panel',
		layout: 'vbox',
		width: '100%'
	},
	// Кнопки меню
	hbtns: [
		// Роль только чтение
		[1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
		// Роль редактирование в режиме просмотра (возможно только из поиска)
		[1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],
		// Роль редактирование в режиме редактирования
		[1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
		// Роль редактирование в режиме создания
		[1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1]],
	listeners: {
		activate: 'setCaseMenu'
	},
	initComponent: function () {
		var caseView = this,
				editRole = Earh.editRole;
		caseView.items = [{
				xtype: 'form',
				title: Trans.acase,
				defaults: {
					labelWidth: 200,
					readOnly: !editRole
				},
				items: [{
						xtype: 'textfield',
						fieldLabel: Trans.caseNum,
						name: 'number',
						allowBlank: false
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.caseType,
						store: 'caseTypeStore',
						displayField: 'value',
						valueField: 'id',
						name: 'type',
						allowBlank: false
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.storeLife,
						name: 'storeLife',
						store: 'storeLifeStore',
						displayField: 'value',
						valueField: 'id',
						allowBlank: false
					}, {
						xtype: 'textarea',
						fieldLabel: Trans.caseTitle,
						name: 'title',
						allowBlank: false
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.startDate,
						name: 'startDate',
						readOnly: true
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.endDate,
						name: 'endDate',
						readOnly: true
					}, {
						xtype: 'treepicker',
						leafOnly: true,
						fieldLabel: Trans.topoRef,
						name: 'toporef',
						store: Earh.store.TopoRef
					}, {
						xtype: 'textarea',
						fieldLabel: Trans.caseRemark,
						name: 'remark'
					}]
			}, {
				title: Trans.caseDocs,
				items: [{
						xtype: 'textfield',
						fieldLabel: Trans.caseDocsSearch,
						labelWidth: 200,
						name: 'context',
						triggers: {
							search: {
								cls: 'search',
								handler: 'searchDocs'
							}
						}
					}, {
						xtype: 'gridpanel',
						store: 'caseDocsStore',
						width: '100%',
						columns: {
							defaults: {
								menuDisabled: true
							},
							items: [{
									text: Trans.volume,
									dataIndex: 'volume'
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
									text: Trans.docDate_,
									dataIndex: 'date'
								}, {
									text: Trans.remark,
									dataIndex: 'remark'
								}, {
									text: Trans.court,
									dataIndex: 'court'
								}, {
									text: Trans.fio,
									dataIndex: 'fio'
								}, graphLinkColumn]
						},
						dockedItems: [{
								xtype: 'container',
								dock: 'top',
								layout: 'hbox',
								items: [{
										xtype: 'button',
										text: Trans.add,
										hidden: !editRole,
										handler: 'addDoc'
									}, {
										xtype: 'pagingtoolbar',
										store: 'caseDocsStore',
										displayInfo: false
									}]

							}]
					}]
			}];
		caseView.callParent();
		caseView._frm = caseView.items.getAt(0);
		caseView._grd = caseView.items.getAt(1).items.getAt(1);
	},
	save: function () {
		this._frm.updateRecord(this.model);
		// TODO реальное сохранение
		this.model.dirty = false;
		showInfo("Сохранение дела", "Операция успешно выполнена");
	},
	remove: function () {
		showInfo("Удаление дела", "Операция успешно выполнена");
	},
	clear: function () {
		// Очищаем все поля
		this._frm.applyAll('reset');
		// очищаем таблицу с результатами поиска
		this._grd.store.removeAll();
	},
	/**
	 * Загружаем данные в форму
	 */
	loadRecord: function () {
		this._frm.loadRecord(this.model);
		return this.model;
	},
	/**
	 * Выгружаем данные в модель
	 */
	updateRecord: function () {
		this._frm.updateRecord(this.model);
		return this.model;
	},
	isValid: function () {
		return this._frm.isValid();
	},
	/**
	 * Реализация общего интерфейса для всех страниц
	 * Для проверки несохраненных данных
	 * @returns {Boolean}
	 */
	isDirty: function () {
		return false;
	}
});


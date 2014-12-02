/*
 * Карточка документа
 */
Ext.define('Earh.view.work.Doc', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.adoc',
	requires: [
		'Ext.layout.container.VBox',
		'Ext.layout.container.HBox',
		'Ext.panel.Panel',
		'Ext.form.Panel',
		'Ext.form.field.Text',
		'Ext.form.field.Number',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.form.field.TextArea',
		'Ext.form.field.File',
		'Ext.panel.Tool',
		'Earh.view.work.DocController',
		'Earh.store.FioResult',
		'Earh.store.CourtResult',
		'Earh.store.DocType'
	],
	layout: 'hbox',
	defaults: {
		xtype: 'form',
		layout: 'vbox'
	},
	// Кнопки меню
	hbtns: [
		// В режиме добавления или удаления в / из дела
		[1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
		// В режиме редактирования, удаления, добавления из поиска документов
		[1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1]],
	listeners: {
		activate: 'setDocMenu'
	},
	initComponent: function () {
		var docView = this;
		docView.title = Trans.doc;
		docView.items = [{
				defaults: {
					labelWidth: 200,
					allowBlank: false
				},
				items: [{
						xtype: 'numberfield',
						fieldLabel: Trans.volume,
						name: 'volume'
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.acase,
						displayField: 'name',
						valueField: 'id',
						name: 'acase',
						allowBlank: true,
						readOnly: true
					}, {
						xtype: 'textfield',
						fieldLabel: Trans.docNum,
						name: 'number'
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.docType,
						name: 'type',
						displayField: 'name',
						valueField: 'id',
						store: 'docTypeStore'
					}, {
						xtype: 'textarea',
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
						xtype: 'textarea',
						fieldLabel: Trans.remark,
						name: 'remark',
						allowBlank: true
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.court,
						name: 'court',
						store: 'courtsStore',
						valueField: 'court',
						displayField: 'court',
						queryMode: 'local',
						allowBlank: true,
						editable: true
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.fio,
						name: 'fio',
						store: 'fiosStore',
						valueField: 'fio',
						displayField: 'fio',
						queryMode: 'local',
						allowBlank: true,
						editable: true
					}]
			}, {
				title: Trans.graph,
				controller: 'docwork',
				tools: [{
						type: 'close',
						tooltip: Trans.delGraph,
						handler: 'removeGraph'
					}],
				items: [{
						xtype: 'container',
						layout: 'hbox',
						items: [{
								xtype: 'fileuploadfield',
								labelWidth: 200,
								buttonOnly: true,
								hideLabel: true,
								buttonText: Trans.file,
								listeners: {
									change: 'graphAdded'
								}
							}, {
								xtype: 'label',
								text: Trans.addGraph
							}]
					}, {
						xtype: 'component',
						width: 400,
						height: 500
					}]
			}];
		docView.callParent();
	},
	save: function () {
		showInfo("Сохранение документа", "Операция успешно выполнена");
	},
	remove: function () {
		showInfo("Удаление документа", "Операция успешно выполнена");
	},
	/**
	 * Переключает режим либо отображения граф. образа, либо кнопки добавления гр. образа
	 */
	setGraph: function sg() {
		var url, graph,
				items = sg.items || (sg.items = this.items.getAt(1).items),
				tool = sg.tool || (sg.tool = this.items.getAt(1).getHeader().items.getAt(1)),
				addGraph = sg.agrh || (sg.argh = items.first()),
				viewGraph = sg.vgrh || (sg.vgrh = items.last());

		if (url = (this.model && (graph = this.model.getGraph()) && graph.get('url'))) {
			addGraph.hide();
			viewGraph.setHtml('<iframe src="' + url + '" width="100%" height="100%"></iframe>');
			viewGraph.show();
			tool.show();
		} else {
			addGraph.show();
			viewGraph.hide();
			tool.hide();
		}
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


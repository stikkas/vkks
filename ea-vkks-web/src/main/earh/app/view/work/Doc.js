/*
 * Карточка документа
 */
Ext.define('Earh.view.work.Doc', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.adoc',
	cls: 'section_panel card_doc fields_panel',
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
		'Earh.view.work.DocController'
	],
	layout: 'hbox',
	defaults: {
		xtype: 'form',
		layout: 'vbox',
		cls: 'fields_doc'
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
		//-----for staff use only------------
		function emptyCombo2(cb) {
			if (!cb.getRawValue())
				cb.reset();
		}
		//-----------------------------------
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
						name: 'volume',                                               
                                                width: 300
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
						name: 'number',
                                                width: 300
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.docType,
						name: 'type',
						displayField: 'name',
						valueField: 'id',
						store: 'docTypeStore',
                                                width: 580
					}, {
						xtype: 'textarea',
						fieldLabel: Trans.docTitle,
						name: 'title',
                                                width: 580
					}, {
						xtype: 'numberfield',
						fieldLabel: Trans.startPageNum,
						name: 'startPage',
                                                width: 300
					}, {
						xtype: 'numberfield',
						fieldLabel: Trans.endPageNum,
						name: 'endPage',
                                                width: 300
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.docDate,
						name: 'date',
                                                width: 332
					}, {
						xtype: 'textarea',
						fieldLabel: Trans.remark,
						name: 'remark',
						allowBlank: true,
                                                width: 580
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.court,
						name: 'court',
						store: 'courtsStore',
						minChars: 1,
						allowBlank: true,
						editable: true,
                                                width: 580,
						listeners: {blur: emptyCombo2}
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.fio,
						name: 'fio',
						store: 'fiosStore',
						minChars: 1,
						allowBlank: true,
						editable: true,
                                                width: 500,
						listeners: {blur: emptyCombo2}
					}]
			}, {
				title: Trans.graph,
				controller: 'docwork',
				cls: 'graf_view',
				tools: [{
						type: 'close',
                                                cls:'close_cls',
						tooltip: Trans.delGraph,
						handler: 'removeGraph'
					}],
				items: [{
						xtype: 'container',
						layout: 'hbox',
						items: [{
								xtype: 'fileuploadfield',
								buttonOnly: true,
								hideLabel: true,
								buttonText: Trans.file,
                                                                cls:'add_file_cls',
								listeners: {
									change: 'graphAdded'
								}
							}, {
								xtype: 'label',
								text: Trans.addGraph
							}]
					}, {
						xtype: 'component',
						width: 500,
						minHeight: 500

					}]
			}];
		docView.callParent();
		docView._frm = docView.items.getAt(0);
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
	},
	/**
	 * Проверяет наличие необходимых данных при сохранении
	 * @returns {boolean}
	 */
	isValid: function () {
		return this._frm.isValid();
	}
});


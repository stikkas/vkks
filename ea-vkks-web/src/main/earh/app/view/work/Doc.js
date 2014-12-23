/*
 * Карточка документа
 */
Ext.define('Earh.view.work.Doc', {
	extend: 'Ext.panel.Panel',
	mixins: ['Earh.view.work.Share'],
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
		'Earh.view.work.DocController',
		'Earh.model.Graph',
		'Earh.store.DocStore'
	],
	layout: 'hbox',
	defaults: {
		xtype: 'form',
		layout: 'vbox',
		cls: 'fields_doc'
	},
	// Кнопки меню
	tbb: [1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1],
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
						xtype: 'textfield',
						fieldLabel: Trans.acase,
						name: 'caseTitle',
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
						cls: 'close_cls',
						tooltip: Trans.delGraph,
						handler: 'removeGraph'
					}],
				items: [{
						xtype: 'container',
						layout: 'hbox',
						items: [{
								xtype: 'fileuploadfield',
								name: 'attachedFile0',
								buttonOnly: true,
								hideLabel: true,
								buttonText: Trans.file,
								cls: 'add_file_cls',
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
		docView._gfrm = docView.items.getAt(1);
		docView._ctf = docView._frm.items.getAt(1);
		docView.store = Ext.create('Earh.store.DocStore');
	},
	/**
	 * Открывает карточку документа. может вызываться по нажатию на ссылку документа,
	 * или на кнопку добавить новый документ
	 * @param {String} caseId идентификатор дела
	 * @param {String} caseTitle заголовок дела 
	 * @param {String} id идентификатор документа (для нового - undefined)
	 */
	open: function (caseId, caseTitle, id) {
		var docView = this;
		if (id) { // Загружаем существуещий документ
			docView.store.load({
				params: {caseId: caseId, id: id},
				callback: function (records, operation, success) {
					if (success) {
						docView.model = records[0];
						docView._frm.loadRecord(docView.model);
						docView.model.getProxy().setUrl(Urls.cdoc);
						docView.setGraph();
					} else {
						docView.fireEvent('backToCase');
						showError("Ошибка", operation.getError());
					}
				}
			});
		} else { // Подготавливаем форму для нового документа
			var model = docView.model = Ext.create('Earh.model.Doc');
			model.set('id', null, {dirty: false});
			model.set('caseId', caseId, {dirty: false});
			model.set('caseTitle', caseTitle, {dirty: false});
			model.getProxy().setUrl(Urls.cdoc);
			docView._frm.reset();
			docView._ctf.setValue(caseTitle);
			docView.setGraph();
		}
	},
	/**
	 * Проверяет есть ли не сохраненные данные
	 * @returns {Boolean}
	 */
	isDirty: function () {
		var docView = this;
		if (docView.model) {
			return docView.graph || docView.updateRecord().dirty;
		}
		// Если модели нет, то об чем может быть речь - все чисто.
		return false;
	},
	/**
	 * Сохраняет данные на сервере, если они изменились.
	 * Проверка на валидность данных должна делаться вызывающей стороной
	 * с помощью метода isValid. 
	 */
	save: function () {
		var view = this;
		if (view.updateRecord().dirty)
			view.model.save({
				callback: function (model, operation, success) {
					if (success) {
						if (view.graph)
							view.saveGraph();
					} else {
						showError("Ошибка сохранения", operation.getError());
					}
				}
			});
		else if (view.graph) {
			view.saveGraph();
		}
	},
	/**
	 * Сохраняет файл на сервере
	 */
	saveGraph: function () {
		var docView = this,
				id = docView.model.get('id'),
				caseId = docView.model.get('caseId');
		docView._gfrm.submit({
			clientValidation: false,
			url: Urls.cgraph,
			params: {
				id: id,
				caseId: caseId
			},
			success: function (form, action) {
				if (action.result.success) {
					docView.setGraph();
					docView.graph = null;
					docView.open(caseId, '', id);
					showInfo("Результат", "Данные сохранены");
				} else {
					showError("Ошибка", action.result.msg);
				}
			},
			failure: function (form, action) {
				showError("Ошибка", action.response.responseText);
			}
		});
	},
	/**
	 * Удаляет графический образ 
	 */
	removeGraph: function () {
		var docView = this;
		Ext.Ajax.request({
			url: Urls.rgraph,
			params: {
				id: docView.model.get('id'),
				caseId: docView.model.get('caseId')
			},
			success: function (answer) {
				var result = Ext.decode(answer.responseText);
				if (result.success) {
					docView.model.set('graph', null, {dirty: false});
					docView.setGraph();
					showInfo("Результаты", "Графический образ удален");
				} else {
					showError("Ошибка", result.msg);
				}
			},
			failure: function (answer) {
				showError("Ошибка", answer.responseText);
			}
		});
	},
	/**
	 * Удаляет документ из дела
	 */
	remove: function () {
		var docView = this,
				id = docView.model.get('id');
		if (id)
			Ext.Ajax.request({
				url: Urls.rdoc,
				params: {
					id: id,
					caseId: docView.model.get('caseId')
				},
				success: function (answer) {
					var result = Ext.decode(answer.responseText);
					if (result.success) {
						showInfo("Результаты", "Документ удален", function () {
							docView.model = null; // Чтобы синхронизировать данные в модели и форме
							docView.fireEvent('backToCase');
						});
					} else {
						showError("Ошибка", result.msg);
					}
				},
				failure: function (answer) {
					showError("Ошибка", answer.responseText);
				}
			});
	},
	/**
	 * Переключает режим либо отображения граф. образа, либо кнопки добавления гр. образа
	 */
	setGraph: function sg() {
		var docView = this,
				url, graph,
				items = sg.items || (sg.items = docView._gfrm.items),
				tool = sg.tool || (sg.tool = docView._gfrm.getHeader().items.getAt(1)),
				addGraph = sg.agrh || (sg.argh = items.first()),
				viewGraph = sg.vgrh || (sg.vgrh = items.last());
		docView.graph = null;
		if (url = (docView.model && docView.model.get("graph"))) {
			addGraph.hide();
			viewGraph.setHtml('<iframe src="' + url + '" width="100%" height="100%"></iframe>');
			viewGraph.show();
			tool.show();
		} else {
			addGraph.show();
			addGraph.items.getAt(1).setText(Trans.addGraph);
			viewGraph.hide();
			tool.hide();
		}
	}
});


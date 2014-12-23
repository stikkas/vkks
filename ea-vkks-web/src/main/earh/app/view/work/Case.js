/*
 * Карточка дела
 */
Ext.define('Earh.view.work.Case', {
	extend: 'Ext.container.Container',
	mixins: ['Earh.view.work.Share'],
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
		'Earh.store.CaseType',
		'Earh.store.Case',
		'Earh.store.StoreLife',
		'Earh.model.Case'
	],
	layout: 'vbox',
	cls: 'fields_panel',
	defaults: {
		xtype: 'panel',
		layout: 'vbox',
		width: '100%'
	},
	// Кнопки меню
	hbtns: [
		// Роль только чтение
		[1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
		// Роль редактирование в режиме просмотра (возможно только из поиска)
		[1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
		// Роль редактирование в режиме редактирования
		[1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1],
		// Роль редактирование в режиме создания
		[1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1]
	],
	initComponent: function () {
		var caseView = this,
				editRole = Earh.editRole;
		caseView.store = Ext.create('Earh.store.Case');
		caseView.items = [{
				xtype: 'form',
				cls: 'section_panel',
				title: Trans.acase,
				defaults: {
					labelWidth: 400,
					readOnly: !editRole
				},
				dockedItems: [{
						dock: 'top',
						xtype: 'pagingtoolbar',
						store: caseView.store,
						beforePageText: Trans.card,
						displayInfo: false
					}],
				items: [{
						xtype: 'textfield',
						fieldLabel: Trans.caseNum,
						name: 'number',
						allowBlank: false,
						width: 515
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.caseType,
						store: 'caseTypeStore',
						displayField: 'name',
						valueField: 'id',
						name: 'type',
						allowBlank: false,
						width: 775
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.storeLife,
						name: 'storeLife',
						store: 'storeLifeStore',
						displayField: 'name',
						valueField: 'id',
						allowBlank: false,
						width: 675
					}, {
						xtype: 'textarea',
						fieldLabel: Trans.caseTitle,
						name: 'title',
						allowBlank: false,
						width: 985
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.startDate,
						name: 'startDate',
						readOnly: true,
						width: 515
					}, {
						xtype: 'datefield',
						fieldLabel: Trans.endDate,
						name: 'endDate',
						readOnly: true,
						width: 515
					}, {
						xtype: 'treepicker',
						leafOnly: true,
						fieldLabel: Trans.topoRef,
						name: 'toporef',
						store: Ext.getStore('topoRefStore'),
						width: 985
					}, {
						xtype: 'textarea',
						fieldLabel: Trans.caseRemark,
						name: 'remark',
						width: 985
					}]
			}, {
				title: Trans.caseDocs,
				cls: 'section_panel doc_case',
				items: [{
						xtype: 'textfield',
						fieldLabel: Trans.caseDocsSearch,
						labelWidth: 400,
						name: 'context',
						cls: 'find_doc',
						width: 835,
						triggers: {
							search: {
								cls: 'search',
								handler: caseView.search,
								scope: caseView
							}
						}
					}, {
						xtype: 'gridpanel',
						store: 'caseDocsStore',
						width: '100%',
						columns: {
							defaults: {
								menuDisabled: true,
								width: '10%'
							},
							items: [{
									text: Trans.volume,
									dataIndex: 'volume',
									width: '5%'
								}, {
									text: Trans.docNum_,
									dataIndex: 'number',
									width: '7%'
								}, {
									text: Trans.docType,
									dataIndex: 'type'
								}, {
									text: Trans.docTitle,
									dataIndex: 'title',
									width: '30%'
								}, {
									text: Trans.pages,
									dataIndex: 'pages',
									width: '5%'
								}, {
									text: Trans.docDate_,
									dataIndex: 'date',
									width: '8%'
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
										handler: 'addDoc',
										cls: 'add_cls'
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
		caseView._tbr = caseView._frm.getDockedItems()[0];
		var docItems = caseView._grd.getDockedItems()[0].items;
		caseView._addb = docItems.getAt(0);
		caseView._gtb = docItems.getAt(1);
		caseView.store.on('load', caseView.loadPage, caseView);
	},
	/**
	 * Вызывается после удачного сохранения данных на сервере
	 */
	sucSave: function () {
		if (this._addb.hidden)
			this._addb.show();
	},
	/**
	 * Удаляет дело
	 */
	remove: function () {
		if (this._grd.store.getCount() > 0) {
			showError("Ошибка", "Невозможно удалить дело, в котором содержатся документы");
		} else {
			var caseView = this,
					id = caseView.model.get('id');
			if (id)
				Ext.Ajax.request({
					url: Urls.rcase,
					params: {
						id: id
					},
					success: function (answer) {
						var result = Ext.decode(answer.responseText);
						if (result.success) {
							showInfo("Результаты", "Дело удалено", function () {
								caseView.model = null; // Чтобы синхронизировать данные в модели и форме
//								caseView._frm.loadRecord(caseView.model);
								if (caseView._crMode) {
									caseView.fireEvent('toMain');
								} else {
									caseView.fireEvent('removeModel', {
										page: Pages.scases
									});
									caseView.fireEvent('backToSearch');
								}
							});
						} else {
							showError("Ошибка", result.msg);
						}
					},
					failure: function (answer) {
						showError("Ошибка", answer.responseText);
					}
				});
		}
	},
	/**
	 * Очищает форму перед созданием нового дела.
	 * Перед редактированием дела отвечает метод loadPage.
	 */
	clear: function () {
		var caseView = this;
		// нужно для отличия режима создания от режима редактирования
		caseView._crMode = true;
		// Очищаем все поля
		caseView._frm.applyAll('reset');
		caseView._frm.items.getAt(6).initPicker();
		// очищаем таблицу с результатами поиска
		caseView._grd.store.removeAll();
		// создаем новую модель
		caseView.model = Ext.create('Earh.model.Case');
		// Только так можно выставить id, иниче extjs присваивает свой id
		caseView.model.set('id', null, {
			dirty: false
		});
		// Очищаем счетчик найденных документов
		caseView._gtb.onLoad();
	},
	/**
	 * Используется при листании
	 * @param {Ext.data.Store} store хранилище
	 * @param {Ext.data.Model[]} records загруженные записи, в нашем случае одна
	 * @param {Boolean} success результат операции
	 */
	loadPage: function (store, records, success) {
		var caseView = this;
		if (success) {
			var caseId;
			Earh.model.Case.getProxy().setUrl(Urls.scase);
			caseView._crMode = false; // Режим создания карточки
			Earh.model.Case.load(caseId = records[0].get('id'), {
				success: function (model, operation) {
					caseView.model = model;
					caseView._frm.loadRecord(model);
					caseView._grd.store.loadPage(1, {
						params: {
							q: Ext.encode({
								id: caseId
							})
						}
					});
					caseView.switchEdit(false);
				},
				failure: function (r, ans) {
					caseView.fireEvent('backToSearch');
					showError("Ошибка", ans.error.statusText);
				}
			});
		} else {
			caseView.fireEvent('backToSearch');
			showError("Ошибка", operation.getError());
		}
	},
	/**
	 * Загружаем данные в форму
	 */
	/*
	 loadRecord: function () {
	 this._frm.loadRecord(this.model);
	 return this.model;
	 },
	 */
	/**
	 * Переключает в режим редактирования
	 * @param {Boolean} stat true - редактирование, false - просмотр
	 */
	switchEdit: function se(stat) {
		var caseView = this,
				idx, model = caseView.model;
		// Кнопка добавления документа
		caseView._addb.setVisible(model && model.get('id') && stat);
		if (se.p !== stat) { // Выполняется только если предыдущий вызов был с другим параметром
			se.p = stat;

			caseView.setReadOnly(!stat);
			caseView._frm.applyAll('setRequired');
			caseView.setVisibleCardBar(!stat);

			if (model)
				model.getProxy().setUrl(stat ? Urls.ccase : Urls.scase);

			if (Earh.editRole) {
				if (stat)
					idx = 2;
				else
					idx = 1;
			} else
				idx = 0;
			caseView.tbb = caseView.hbtns[idx];
			// Изменяем вид результатов поиска при наведении курсора
			caseView.fireEvent('toDocEn', {
				flag: stat,
				scope: caseView
			});
		}
	},
	/**
	 * открывает или закрывает доступ к переходу в карточку документа
	 * @param {Boolean} stat true - открыть, false - закрыть
	 * @param {Function} fn обработчик события
	 * @param {Object} controller scope для обработчика события
	 */
	toDocEnable: function (stat, fn, controller) {
		var grid = this._grd,
				cls = 'doc_search';
		if (stat) {
			grid.removeCls(cls);
			grid.addListener('cellclick', fn, controller, {caseId: this.model.get('id')});
		} else {
			grid.addCls(cls);
			grid.removeListener('cellclick', fn, controller);
		}
	},
	/**
	 * Показывает или скрывает toolbar для пролистывания дел
	 * @param {Boolean} stat true - показать, false - скрыть
	 */
	setVisibleCardBar: function (stat) {
		this._tbr.setVisible(stat);
	},
	/**
	 * Устанавливает форму в режим просмотра или редактирования
	 * @param {Boolean} stat  true - просмотр, false - редактирование
	 */
	setReadOnly: function (stat) {
		var items = this._frm.items,
				i, max = items.length;
		for (i = 0; i < max; ++i) {
			if (i === 4) { // пропускаем даты
				++i;
				continue;
			}
			items.getAt(i).setReadOnly(stat);
		}
	},
	/**
	 * Устанавливает звездочку для обязательных полей
	 */
	setRequired: function () {
		this._frm.applyAll('setRequired');
	},
	/**
	 * Ищет документы в соответствии с текущим делом
	 * @param {Ext.form.field.TextField} tf виджет с данными для поиска
	 */
	search: function (tf) {
		var caseId = this.model.get('id');
		if (caseId)
			this._grd.store.loadPage(1, {
				params: {
					q: Ext.encode({
						id: caseId,
						context: tf.getValue()
					})
				}
			});
	}
});

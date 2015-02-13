/*
 * Карточка дела
 */
Ext.define('Earh.view.work.Case', {
	extend: 'Ext.container.Container',
	mixins: ['Earh.view.work.Share'],
	alias: 'widget.acase',
	requires: [
		'Ext.layout.container.VBox',
		'Ext.layout.container.HBox',
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
	cls: 'fields_panel case_panel',
	defaults: {
		xtype: 'panel',
		layout: 'vbox',
		width: '100%'
	},
	// Кнопки меню
	hbtns: [
		// Роль только чтение
		[1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
		// Роль редактирование в режиме просмотра (возможно только из поиска)
		[1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
		// Роль редактирование в режиме редактирования
		[1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
		// Роль редактирование в режиме создания
		[1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1]
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
						xtype: 'container',
						layout: 'hbox',
						cls: 'padt5 padb5',
						items: [{
								xtype: 'textfield',
								fieldLabel: Trans.numPrefix,
								name: 'numPrefix',
								readOnly: true,
								labelWidth: 400,
								width: 480
							}, {
								xtype: 'numberfield',
								fieldLabel: Trans.numNumber,
								name: 'numNumber',
								minValue: 1,
								labelWidth: 160,
								width: 230,
								enforceMaxLength: true,
								maxLength: 5
							}]
					}, {
						xtype: 'combobox',
						fieldLabel: Trans.caseType,
						store: 'caseTypeStore',
						displayField: 'name',
						valueField: 'id',
						name: 'type',
						allowBlank: false,
						width: 775,
						listeners: {
							change: caseView.changePrefix,
							scope: caseView
						}
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
						width: '99%',
						columns: {
							defaults: {
								menuDisabled: true,
								renderer: tipRenderer
							},
							items: [/*{
							 text: Trans.volume,
							 dataIndex: 'volume',
							 width: '5.3%'
							 }, */{
									text: Trans.docNum_,
									dataIndex: 'number',
									width: '9.9%'
								}, {
									text: Trans.docType,
									dataIndex: 'type',
									width: '10%'
								}, {
									text: Trans.docTitle,
									dataIndex: 'title',
									width: '25%'
								}, {
									text: Trans.pagesCount,
									dataIndex: 'pages',
									width: '5%'
								}, {
									text: Trans.docDate_,
									dataIndex: 'date',
									sortable: false,
									width: '8%'
								}, {
									text: Trans.remark,
									dataIndex: 'remark',
									width: '11%'
								}, {
									text: Trans.court,
									dataIndex: 'court',
									width: '10%'
								}, {
									text: Trans.fio,
									dataIndex: 'fio',
									width: '10.5%'
								}, graphLinkColumn]
						},
						dockedItems: [{
								xtype: 'container',
								dock: 'top',
								//layout: 'hbox',
								items: [{
										xtype: 'button',
										text: Trans.add,
										hidden: !editRole,
										handler: 'addDoc',
										cls: 'add_cls'
									}, {
										xtype: 'pagingtoolbar',
										store: 'caseDocsStore'
									}]

							}]
					}]
			}];
		caseView.callParent();
		var items = caseView.items,
				form = caseView._frm = items.getAt(0),
				caseNumber = form.items.getAt(0).items;

		caseView._prefix = caseNumber.getAt(0);
		caseView._number = caseNumber.getAt(1);

		caseView._grd = items.getAt(1).items.getAt(1);
		caseView._tbr = form.getDockedItems()[0];

		var docItems = caseView._grd.getDockedItems()[0].items;
		caseView._addb = docItems.getAt(0);
		caseView._gtb = docItems.getAt(1);

		caseView.store.on('load', caseView.loadPage, caseView);
	},
	/**
	 * Реализация общего интерфейса для всех страниц
	 * Для проверки несохраненных данных
	 * @returns {Boolean}
	 */
	isDirty: function () {
		if (this.model)
			return this.updateRecord().dirty;
		// Если модели нет, то об чем может быть речь - все чисто.
		return false;
	},
	/**
	 * Сохраняет данные на сервере, если они изменились.
	 * Проверка на валидность данных должна делаться вызывающей стороной
	 * с помощью метода isValid. наследующий данный метод должен предаставить
	 * метод sucSave, который будет вызываться в случае удачного сохранения.
	 * @param {Boolean} ignoreDuplicates сохранять дела с одинаковыми номерами
	 */
	save: function (ignoreDuplicates) {
		var view = this;
		if (view.isDirty()) {
			var caseId = view.model.get('id'); // Модель обновлена уже раньше, когда проверялась на несохраненные данные
			Ext.getBody().mask("Выполнение");
			view.model.save({
				params: {
					ignoreDuplicates: ignoreDuplicates
				},
				callback: function (model, operation, success) {
					Ext.getBody().unmask();
					if (success) {
						delete model.data['success'];
//						delete view.model.data['success'];
						if (view._addb.hidden)
							view._addb.show();
						// Дело создалось
						if (!caseId) {
							view.showNumber(true);
							view._frm.loadRecord(model);
							view._grd.store.loadPage(1, {
								params: {
									q: Ext.encode({
										id: model.get('id')
									})
								}
							});
						}

						view.fireEvent('caseChanged');
						showInfo("Результат", "Данные сохранены");
					} else {
						showAlert('Внимание', 'Номер дела не уникален.<br>Продолжить сохранение?',
								function (btn) {
									if (btn === 'yes') {
										view.save(true);
									}
								});
//						showError("Ошибка сохранения", operation.getError());
					}
				}
			});
		}
	},
	/**
	 * Удаляет дело
	 */
	remove: function () {
		var caseView = this,
				id = caseView.model.get('id');
		// существование id должно проверятся выше, в данном случае в MainController
		Ext.getBody().mask("Удаление");
		Ext.Ajax.request({
			url: Urls.rcase,
			params: {
				id: id
			},
			success: function (answer) {
				Ext.getBody().unmask();
				var result = Ext.decode(answer.responseText);
				if (result.success) {
					showInfo("Результаты", "Дело удалено", function () {
						caseView.model = null; // Чтобы синхронизировать данные в модели и форме
//								caseView._frm.loadRecord(caseView.model);
						if (caseView._crMode) {
							caseView.fireEvent('toMain');
						} else {
							caseView.fireEvent('caseChanged');
							//		caseView.fireEvent('removeModel', {
							//			page: Pages.scases
							//		});
							caseView.fireEvent('backToSearch');
						}
					});
				} else {
					showError("Ошибка", result.msg);
				}
			},
			failure: function (answer) {
				Ext.getBody().unmask();
				showError("Ошибка", answer.responseText);
			}
		});

	},
	/**
	 * Очищает форму перед созданием нового дела.
	 * Перед редактированием дела очищает метод loadPage.
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
		caseView.changeTitle(caseView.model);
		// Только так можно выставить id, иниче extjs присваивает свой id
		caseView.model.set('id', null, {
			dirty: false
		});
		// Очищаем счетчик найденных документов
		caseView._gtb.onLoad();
		// скрываем номер дела
		caseView.showNumber(false);
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
			caseView.showNumber(true);
			var caseId;
			Earh.model.Case.getProxy().setUrl(Urls.scase);
			caseView._crMode = false; // Режим создания карточки
			Earh.model.Case.load(caseId = records[0].get('id'), {
				success: function (model, operation) {
					caseView.model = model;
					caseView._frm.loadRecord(model);
					caseView.changeTitle(model);
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
			showError("Ошибка", "Ошибка получения данных");
		}
	},
	/**
	 * Загружаем данные в форму.
	 * Используется после обновления, или добавления документа
	 */
	loadRecord: function () {
		var caseView = this;
		Earh.model.Case.getProxy().setUrl(Urls.scase);
		Earh.model.Case.load(caseView.model.get('id'), {
			success: function (model, operation) {
				caseView.model = model;
				caseView._frm.loadRecord(model);
				caseView.changeTitle(model);
				caseView.model.getProxy().setUrl(Urls.ccase);
			},
			failure: function (r, ans) {
				showError("Ошибка", ans.error.statusText);
			}
		});
	},
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

			caseView._number.allowBlank = caseView._number.hidden ? true : false;

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
			grid.addListener('cellclick', fn, controller);
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
		this._number.setReadOnly(stat);
		var items = this._frm.items,
				i, max = items.length;
		for (i = 1; i < max; ++i) {
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
				},
				callback: function (records) {
					if (!records || records.length === 0)
						showInfo("Результат", "Документы не найдены");
				}
			});
	},
	/**
	 * Сообщает имеет ли дело документы
	 * @returns {Boolean} true - если документы имеются
	 */
	hasDocuments: function () {
		return this._grd.store.getCount() > 0;
	},
	/**
	 * Устанавливает заголовок карточки дела 
	 * @param {Ext.data.Model} model запись дела
	 */
	changeTitle: function (model) {
		var pages, lists, ost;
		if ((pages = model.get('pages')) && pages > 0) {
			ost = pages % 10;
			if ((pages > 4 && pages < 21) || ost > 4 || ost === 0)
				lists = 'листов';
			else if (ost === 1)
				lists = 'лист';
			else
				lists = 'листа';
			this._frm.setTitle(Trans.acase + ' (' + pages + ' ' + lists + ')');
		}
		else
			this._frm.setTitle(Trans.acase);

	},
	/**
	 * Изменяет префикс номера дела при изменении типа дела
	 * @param {Ext.form.field.ComboBox} combo элемент "Тип дела"
	 * @param {Number} newValue новое значение элемента
	 */
	changePrefix: function (combo, newValue) {
		this._prefix.setValue(combo.store.getById(newValue).get('case_type_index'));
	},
	/**
	 * Устанавливает видимость полей номера дела
	 * @param {Boolean} stat true - показать, false - скрыть
	 */
	showNumber: function (stat) {
		var caseView = this;
		caseView._prefix.setVisible(stat);
		caseView._number.setVisible(stat);
		caseView._number.allowBlank = !stat;
		caseView._number.setRequired(stat);
	}

});

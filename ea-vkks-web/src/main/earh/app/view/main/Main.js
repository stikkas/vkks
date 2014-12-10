/**
 * Основный виджет
 */
Ext.define('Earh.view.main.Main', {
	extend: 'Ext.container.Viewport',
	requires: [
		'Earh.view.main.MainController',
		'Earh.view.header.Header',
		'Earh.view.home.Home',
		'Earh.store.TopoRef',
		'Earh.store.CaseType',
		'Earh.store.CaseResult',
		'Earh.store.DocType',
		'Earh.store.FioResult',
		'Earh.store.StoreLife',
		'Ext.layout.container.VBox',
		'Ext.container.Container',
		'Ext.layout.container.Card',
		'Ext.form.Panel'
	],
	alias: 'widget.eamain',
	controller: 'main',
	layout: {
		type: 'vbox'
	},
	items: [{
			xtype: 'eaheader'/*,
			 region: 'north'*/
		}, {
			xtype: 'container',
			width: "100%",
			layout: 'card'/*,
			 region: 'center'*/
		}],
	initComponent: function () {
		this.initStores();

		var mainView = this;
		mainView.callParent();
		mainView._header = mainView.items.getAt(0);
		mainView._center = mainView.items.getAt(1);
		mainView._clayout = mainView._center.getLayout();
		mainView._pages = {};
		mainView.setActiveItem(Pages.home);
	},
	/**
	 * Переключает на нужную страницу
	 * @param {String} page название желаемой страницы (из Pages)
	 */
	setActiveItem: function (page) {
		var mainView = this,
				item = mainView._pages[page];
		if (!item) {
			item = mainView._pages[page] = Ext.widget(page);
			mainView._center.add(item);
		}
		mainView._clayout.setActiveItem(item);
	},
	/**
	 * Возвращает активный на данным момент компонент
	 * @returns {Object} активный компонент
	 */
	getActiveItem: function () {
		return this._clayout.getActiveItem();
	},
	/**
	 * Скрывает панель инструментов целиком
	 */
	hideTB: function () {
		this._header.hideTB();
	},
	/**
	 * Показывает панель инструментов
	 * @param {Boolean[]} buttons список булевых значений (или эквивалентов) для
	 * включения и отключения определенных кнопок
	 */
	showTB: function (buttons) {
		this._header.showTB(buttons);
	},
	/** Иницализируем нужные хранилища, которые по-хорошему должны быть
	 * одиночками, но в силу особенностей компиляции Extjs и моим желанием
	 * иметь все урлы в одном месте, приходится идти на такой трюк
	 */
	initStores: function () {
		Ext.create('Earh.store.CaseType').load({callback: function (records, op, success) {
				if (success)
					addEmptyToPlain(records, 'caseTypeStoreEm');
			}});
		Ext.create('Earh.store.DocType').load(function (records, op, success) {
			if (success)
				addEmptyToPlain(records, 'docTypeStoreEm');
		});
		Ext.create('Earh.store.StoreLife').load(function (records, op, success) {
			if (success)
				addEmptyToPlain(records, 'storeLifeStoreEm');
		});
		Ext.create('Earh.store.TopoRef').load();
		Ext.create('Earh.store.CaseResult');
		Ext.create('Earh.store.FioResult');

		function addEmptyToPlain(records, storeId) {
			var data = [{code: '', id: 0, name: '&nbsp'}];
			for (var i = 0; i < records.length; ++i) {
				var obj = {};
				for (var o in records[i].raw)
					obj[o] = records[i].raw[o];
				data.push(obj);
			}
			Ext.create('Ext.data.Store', {
				storeId: storeId,
				model: 'Earh.model.Dict',
				data: data,
				proxy: {type: 'memory'},
				queryMode: 'local'
			});

		}
	}
});

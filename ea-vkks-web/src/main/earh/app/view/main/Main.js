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
		// Иницализируем нужные хранилища, которые по-хорошему должны быть
		// одиночками, но в силу особенностей компиляции Extjs и моим желанием
		// иметь все урлы в одном месте, приходится идти на такой трюк
		Ext.create('Earh.store.TopoRef').load();
		Ext.create('Earh.store.CaseType').load();
		Ext.create('Earh.store.DocType').load();
		Ext.create('Earh.store.StoreLife').load();
		Ext.create('Earh.store.CaseResult');

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
	}
});

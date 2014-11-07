/**
 * Основный виджет
 */
Ext.define('Earh.view.main.Main', {
	extend: 'Ext.container.Viewport',
	requires: [
		'Earh.view.main.MainController',
		'Earh.view.header.Header',
		'Earh.view.welcome.Welcome',
		'Ext.layout.container.Border',
		'Ext.container.Container',
		'Ext.layout.container.Card',
		'Ext.form.Panel'
	],
	alias: 'widget.eamain',
	controller: 'main',
	layout: {
		type: 'border'
	},
	items: [{
			xtype: 'eaheader',
			region: 'north'
		}, {
			xtype: 'container',
			layout: 'card',
			region: 'center'
		}],
	initComponent: function () {
		var mainView = this;
		mainView.callParent();
		mainView._header = mainView.items.getAt(0);
		mainView._center = mainView.items.getAt(1);
		mainView._clayout = mainView._center.getLayout();
		mainView._pages = {};
		mainView.setActiveItem(Pages.welcome);
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
	hideTB: function () {
		this._header.hideTB();
	},
	showTB: function (buttons) {
		this._header.showTB(buttons);
	}
});

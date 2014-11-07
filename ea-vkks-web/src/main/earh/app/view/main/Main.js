/**
 * Основный виджет
 */
Ext.define('Earh.view.main.Main', {
	extend: 'Ext.container.Viewport',
	requires: [
		'Earh.view.main.MainController',
		'Earh.view.header.Header',
		'Earh.view.search.Case',
		'Earh.view.search.Doc',
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
			region: 'north',
			controller: 'main'
		}, {
			xtype: 'container',
			layout: 'card',
			region: 'center'
		}],
	initComponent: function () {
		var mainView = this;
		mainView.callParent();
		mainView._center = mainView.items.getAt(1);
		mainView._clayout = mainView._center.getLayout();
		mainView.setActiveItem(Ext.widget('casesearch'));
	},
	/**
	 * Добавляет компонент в центральный регион
	 * @param {Object} widget добавляемый элемент
	 */
	_add: function (widget) {
		widget.cardId = this._center.items.length;
		this._center.add(widget);
	},
	/**
	 * Переключает на карточку с заданным индексом
	 * @param {Number/Object} it индекс желаемого элемента или сам элемент
	 */
	setActiveItem: function (it) {
		if (it instanceof Object && it.cardId === undefined)
			this._add(it);
		this._clayout.setActiveItem(it);
	},
	/**
	 * Возвращает активный на данным момент компонент
	 * @returns {Object} активный компонент
	 */
	getActiveItem: function () {
		return this._clayout.getActiveItem();
	}
});

/**
 * Абстрактный класс для хранилища результатов поиска
 * @abstract
 */
Ext.define('Earh.store.SearchResult', {
	extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.Ajax'],
	constructor: function (model, what) {
		this.callParent();
		this.setModel(model);
		this.setProxy(Ext.create('Ext.data.proxy.Ajax', {
			url: Urls.search,
			reader: 'json',
			writer: 'json',
			extraParams: {what: what}
		}));
	}
});

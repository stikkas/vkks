/**
 * Абстрактный класс для хранилища результатов поиска
 * @abstract
 */
Ext.define('Earh.store.SearchResult', {
	extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.Ajax'],
	constructor: function (url) {
		this.callParent();
		this.setProxy(Ext.create('Ext.data.proxy.Ajax', {
			url: url,
			reader: 'json',
			writer: 'json'
		}));
	}
});

/**
 * Абстрактный класс для хранилища результатов поиска
 * @abstract
 */
Ext.define('Earh.store.SearchResult', {
	extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.Ajax'],
	remoteSort: true,
	constructor: function (url) {
		this.callParent();
		this.setProxy(Ext.create('Ext.data.proxy.Ajax', {
			url: url,
			reader: {
				type: 'json',
				rootProperty: 'values',
				totalProperty: 'results'
			},
			writer: 'json',
			timeout: 120000
		}));
	}
});

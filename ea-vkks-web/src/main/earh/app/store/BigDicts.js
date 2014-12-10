/**
 * Абстрактный класс для хранилища результатов изменяющихся словарей
 * @abstract
 */
Ext.define('Earh.store.BigDicts', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.Ajax'
	],
	fields: ['text'],
	remoteFilter: true,
	constructor: function (url) {
		this.callParent();
		this.setProxy(Ext.create('Ext.data.proxy.Ajax', {
			url: url,
			reader: {
				type: 'json',
				transform: function (data) {
					var newdata = [];
					for (var i = 0, max = data.length; i < max; ++i)
						newdata.push({text: data[i]});
					return newdata;
				}
			},
			writer: 'json'
		}));
	}
});

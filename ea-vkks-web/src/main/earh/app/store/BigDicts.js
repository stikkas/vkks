/**
 * Абстрактный класс для хранилища результатов изменяющихся словарей
 * @abstract
 */
Ext.define('Earh.store.BigDicts', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.Ajax'
	],
	model: 'Earh.model.SingleDimArray',
	remoteFilter: true,
	constructor: function (url) {
		this.callParent();
		this.setProxy(Ext.create('Ext.data.proxy.Ajax', {
			url: url,
			reader: 'json',
			writer: 'json'
		}));
	},
	/*
	 listeners: {
	 load: function (st, data) {
	 //			console.log(st.data);
	 //			data.forEach(function (d, i) {
	 //				console.log(i + ' ' + d.data);
	 //				st.add({data: d.data});
	 //			});
	 }
	 }
	 */
});

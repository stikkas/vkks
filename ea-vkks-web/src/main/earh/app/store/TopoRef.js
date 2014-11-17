/**
 * Хранилище для топографического указателя
 */
Ext.define('Earh.store.TopoRef', {
	extend: 'Ext.data.TreeStore',
	storeId: 'topoRefStore',
	requires: [
		'Earh.model.Tree',
		'Ext.data.proxy.Ajax'
	],
	singleton: true,
	model: 'Earh.model.Tree',
	constructor: function () {
		/*
		 this.setProxy(Ext.create('Ext.data.proxy.Ajax', {
		 url: Urls.dict,
		 reader: 'json',
		 writer: 'json',
		 extraParams: {dict: Dicts.toporef}
		 }));
		 */
		Ext.apply(this, {
			root: {
				text: 'Root',
				children: [
					{id: 1, address: 'Address 1', children: [{room: 'room 1',
								children: [{rack: 'rack 1',
										children: [{shelf: 'self 1'}]}]}]},
					{id: 2, address: 'Address 2', children: [{room: 'room 2',
								children: [{rack: 'rack 2',
										children: [{shelf: 'self 2'}]}]}]}
				]
			}
		});
		this.callParent();
	}
});



/**
 * Хранилище для топографического указателя
 */
Ext.define('Earh.store.TopoRef', {
	extend: 'Ext.data.TreeStore',
	requires: [
		'Earh.model.Tree',
		'Ext.data.proxy.Ajax'
	],
	model: 'Earh.model.Tree',
	rootVisible: false,
	storeId: 'topoRefStore',
	singleton: true,
	defaultRootProperty: 'kids',
//	root: {
//		id: 0,
//		name: 'root',
//		expanded: true
//	},
	proxy: {
		type: 'memory'
	},
	root: {
		expanded: true,
		text: 'Root',
		kids: [{
				id: 1, name: 'ком. 1', kids: [{
						id: 4, name: 'ст. 1', kids: [{
								id: 6, name: 'п. 1', leaf: true
							}, {
								id: 7, name: 'п. 2', leaf: true
							}]}, {
						id: 5, name: 'ст. 2', kids: [{
								id: 8, name: 'п. 1', leaf: true
							}, {
								id: 9, name: 'п. 2', leaf: true
							}]
					}]}, {
				id: 2, name: 'ком. 2', kids: [{
						id: 3, name: 'ст. 1', kids: [{
								id: 10, name: 'п. 1', leaf: true
							}]
					}]
			}]
	},
	constructor: function () {
		/*
		 this.setProxy(Ext.create('Ext.data.proxy.Ajax', {
		 url: Urls.dict,
		 reader: 'json',
		 writer: 'json',
		 extraParams: {dict: Dicts.toporef}
		 }));
		 */
		this.callParent();
	}
});



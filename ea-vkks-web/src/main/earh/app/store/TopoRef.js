/**
 * Хранилище для топографического указателя
 */
Ext.define('Earh.store.TopoRef', {
	extend: 'Ext.data.TreeStore',
	requires: ['Ext.data.proxy.Ajax'],
	model: 'Earh.model.Tree',
	storeId: 'topoRefStore',
//	root: {
//		id: 0,
//		text: 'root',
//		expanded: true
//	},
//	proxy: {
//		type: 'memory'
//	},
//	root: {
//		expanded: true,
//		name: 'Root',
//		id: 0,
//		kids: [{
//				id: 1, name: 'ком. 1', kids: [{
//						id: 4, name: 'ст. 1', kids: [{
//								id: 6, name: 'п. 1', leaf: true
//							}, {
//								id: 7, name: 'п. 2', leaf: true
//							}]}, {
//						id: 5, name: 'ст. 2', kids: [{
//								id: 8, name: 'п. 1', leaf: true
//							}, {
//								id: 9, name: 'п. 2', leaf: true
//							}]
//					}]}, {
//				id: 2, name: 'ком. 2', kids: [{
//						id: 3, name: 'ст. 1', kids: [{
//								id: 10, name: 'п. 1', leaf: true
//							}]
//					}]
//			}]
//	},
	constructor: function () {
		this.callParent();
		this.setProxy(Ext.create('Ext.data.proxy.Ajax', {
			url: Urls.dict,
			reader: 'json',
			writer: 'json',
			extraParams: {action: Actions.tree}
		}));
	},
	listeners: {
		load: function (st, records, suc, op, node) {
			if (records.length > 0) {
				var root = st.copyNode(node);
				root.children.unshift({id: 'root', text: '', path: '', leaf: true});
				Ext.create('Ext.data.TreeStore', {
					model: 'Earh.model.Tree',
					storeId: 'topoRefStoreEm',
					proxy: {type: 'memory'},
					root: root
				});
			}
		}
	},
	/**
	 * Копирует все дерево
	 * @param {Object} node корень
	 * @returns {Object} новое дерево
	 */
	copyNode: function (node) {
		var data = node.data,
				newnode = {id: data.id, text: data.text,
					leaf: data.leaf, path: data.path};
		if (node.childNodes) {
			var children = [];
			for (var i = 0; i < node.childNodes.length; ++i)
				children.push(this.copyNode(node.childNodes[i]));

			newnode.children = children;
		}
		return newnode;
	}
});



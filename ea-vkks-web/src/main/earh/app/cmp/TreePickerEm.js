/**
 * Виджет (TreePicker) для выбора одного значения из списка. Отличается от стандартного
 * тем, что первым элементом списка выбора будет элемент с пустым значением.
 */
Ext.define('Earh.cmp.TreePickerEm', {
	extend: 'Ext.ux.TreePicker',
	xtype: 'emptytreepicker',
	initComponent: function () {
		var me = this;
		me.callParent();

		var root = me.copyNode(me.store.root);
		root.children.unshift({id: 'root', text: '', path: '', leaf: true});
		var newstore = Ext.create('Ext.data.TreeStore', {
			proxy: {type: 'memory'},
			queryMode: 'local',
			model: me.store.model,
			root: root
		});

		me.setStore(newstore);
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

/**
 * ComboBox с выбором из дерева
 */
Ext.define('Earh.cmp.TreeComboBox', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.treecombobox',
	requires: [
		'Ext.tree.Panel',
//		'Earh.store.TopoRef'
	],
	createPicker: function () {
		return Ext.create('Ext.tree.Panel', {
			floating: true,
			rootVisible: false,
			minHeight: 150,
//			store: 'topoRefStore'
		});
	}
});



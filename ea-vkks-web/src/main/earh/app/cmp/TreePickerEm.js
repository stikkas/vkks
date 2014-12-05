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

		var model = me.store.root.childNodes[0].$className,
				emptyObj = Ext.create(model);
		emptyObj.set(me.displayField, '');
		emptyObj.set(me.valueField, '');

		me.store.insert(0, emptyObj);
	}
});


/**
 * Виджет (ComboBox) для выбора одного значения из списка. Отличается от стандартного
 * тем, что первым элементом списка выбора будет элемент со значением null.
 * Показываемое значение первого элемента можно задать.
 */
Ext.define('Earh.cmp.ComboBoxEm', {
	extend: 'Ext.form.field.ComboBox',
	xtype: 'emptycombo',
	initComponent: function () {
		var me = this;
		me.callParent();
		me.store.on('load', function (st) {
			var emptyObj = {};
			emptyObj[me.valueField] = 0;
			emptyObj[me.displayField] = '&nbsp';
			st.insert(0, emptyObj);
		});
	},
	listeners: {
		/**
		 * В случае если выбран элемент со значением null очищаются все сообщения
		 * валидации и отбражается первый элемент хранилища.
		 *
		 * @param {Ext.form.field.ComboBox} cb компонент
		 * @param {Array(Ext.data.Model)} selection модель хранилища
		 */
		change: function (cb, value) {
			if (value === 0)
				cb.reset();
		}
	}
});

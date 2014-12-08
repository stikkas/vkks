
/**
 * Виджет (ComboBox) для выбора одного значения из списка. Отличается от стандартного
 * тем, что первым элементом списка выбора будет элемент со значением 0.
 * Подразумевается, что значения цифровые и больше нуля.
 */
Ext.define('Earh.cmp.ComboBoxEm', {
	extend: 'Ext.form.field.ComboBox',
	xtype: 'emptycombo',
	initComponent: function () {
		var me = this;
		me.callParent();
		me.store.on('load', function handler(st, records) {
			me.store.removeListener('load', handler);
			var target = Ext.create('Ext.data.Store', {
				model: st.model,
				proxy: {type: 'memory'},
				queryMode: 'local'
			});
			target.loadData(records);
			var emptyObj = {};
			emptyObj[me.valueField] = 0;
			emptyObj[me.displayField] = '&nbsp';
			target.insert(0, emptyObj);
			me.setStore(target);
		});
	},
	listeners: {
		/**
		 * В случае если выбран элемент со значением 0 очищаются все сообщения
		 * валидации и отбражается первый элемент хранилища.
		 *
		 * @param {Ext.form.field.ComboBox} cb компонент
		 * @param {Number} value новое значение
		 */
		change: function (cb, value) {
			if (value === 0)
				cb.reset();
		}
	}
});

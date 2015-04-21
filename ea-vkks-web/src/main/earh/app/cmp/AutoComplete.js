/**
 * Виджет (ComboBox) с возможностью автодополнения.
 */
Ext.define('Earh.cmp.AutoComplete', {
	extend: 'Ext.form.field.ComboBox',
	xtype: 'autocombo',
	minChars: 1,
	editable: true,
	listeners: {
		blur: function (cb) {
			if (!cb.getRawValue())
				cb.reset();
		}
	}
});

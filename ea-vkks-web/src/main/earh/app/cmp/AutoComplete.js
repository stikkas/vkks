/**
 * Виджет (ComboBox) с возможностью автодополнения.
 */
Ext.define('Earh.cmp.AutoComplete', {
	extend: 'Ext.form.field.ComboBox',
	xtype: 'autocombo',
	minChars: 1,
	editable: true,
	enableKeyEvents: true,
	listeners: {
		keypress: function (combo, event) {
			if (event.getKey() === event.SPACE) {
				event.stopEvent();
			}
		}
	}
});

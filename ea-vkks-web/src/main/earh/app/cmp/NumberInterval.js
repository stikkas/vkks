/**
 * Ввод интервала целых чисел
 */
Ext.define('Earh.cmp.NumberInterval', {
	extend: 'Ext.form.FieldContainer',
	requires: [
		'Ext.form.field.Number',
		'Ext.layout.container.HBox'
	],
	layout: 'hbox',
	labelSeparator: '',
	allowBlank: true,
	defaults: {
		xtype: 'numberfield'
	},
	/**
	 * Создает контейнер с двумя цифровыми полями
	 * @param {String} title общий заголовок для полей
	 * @param {String} fromName имя для поля 'c'
	 * @param {String} toName имя поля для 'по'
	 * @param {Object} cfgMain дополнительные свойства для контейнера
	 * @param {Object} cfgItems дополнительные свойства для элементов
	 */
	constructor: function (title, fromName, toName, cfgMain, cfgItems) {
		var numberInterval = this,
				items = numberInterval.items = [{
						fieldLabel: 'с',
						name: fromName
					}, {
						fieldLabel: 'по',
						name: toName
					}];
		for (var o in cfgMain)
			numberInterval[o] = cfgMain[o];
		for (var o in cfgItems) {
			var cfgData = cfgItems[o];
			items[0][o] = cfgData;
			items[1][o] = cfgData;
		}
		numberInterval.fieldLabel = title;
		numberInterval.callParent();

		numberInterval.validate = numberInterval.isValid = numberInterval._valid;
	},
	_valid: function () {
		var items = this.items,
				fromValue = items.getAt(0).getValue(),
				toValue = items.getAt(1).getValue();
		if (fromValue === toValue && fromValue === undefined)
			return this.allowBlank;
		if (fromValue === undefined || toValue === undefined)
			return false;
		return toValue >= fromValue;
	}
});




/**
 * Ввод интервала целых чисел
 */
Ext.define('Earh.cmp.NumberInterval', {
	extend: 'Ext.form.FieldContainer',
	requires: [
		'Ext.form.field.Number',
		'Ext.layout.container.HBox'
	],
	alias: 'widget.numberinterval',
	layout: 'hbox',
	labelSeparator: '',
	/**
	 * имя первого поля
	 */
	fromName: 'fromNumber',
	/**
	 * имя второго поля
	 */
	toName: 'toNumber',
	/**
	 * конфиг для обоих полей
	 */
	fieldsConfig: {},
	/**
	 * конфиг для первого поля
	 */
	fromFieldConfig: {},
	/**
	 * конфиг для второго поля
	 */
	toFieldConfig: {},
	/**
	 * Метка для первого поля
	 */
	fromFieldLabel: 'с',
	/**
	 * Метка для второго поля
	 */
	toFieldLabel: 'по',
	allowBlank: true,
	defaults: {
		xtype: 'numberfield'
	},
	/**
	 * Создает контейнер с двумя цифровыми полями
	 */
	initComponent: function () {
		var numberInterval = this,
				item1, item2,
				fromFieldConfig = numberInterval.fromFieldConfig,
				toFieldConfig = numberInterval.toFieldConfig,
				fieldsConfig = numberInterval.fieldsConfig;
		numberInterval.items = [
			item1 = {
				fieldLabel: numberInterval.fromFieldLabel,
				name: numberInterval.fromName
			},
			item2 = {
				fieldLabel: numberInterval.toFieldLabel,
				name: numberInterval.toName
			}];
		for (var o in fieldsConfig) {
			var cfgData = fieldsConfig[o];
			item1[o] = cfgData;
			item2[o] = cfgData;
		}
		for (var o in fromFieldConfig)
			item1[o] = fromFieldConfig[o];
		for (var o in toFieldConfig)
			item2[o] = toFieldConfig[o];

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




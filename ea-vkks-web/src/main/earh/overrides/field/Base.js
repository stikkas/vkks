/*
 * Переопределяем основной класс для полей формы.
 * Устанавливаем общие настройки.
 * Добавляем возможность помечать поля, значения которых обязательны.
 */

Ext.define('Other.field.Base', {
	override: 'Ext.form.field.Base',
	labelSeparator: '',
	labelAlign: 'right',
	/**
	 * Устанавливает режим обязательности для поля формы
	 */
	setRequired: function () {
		var me = this;
		if (!(me.readOnly || me.allowBlank)) {
			me.labelEl.setHtml("<span>*</span>" + me.fieldLabel + me.labelSeparator);
//			me.addListener("change", requiredFieldChanged, null, me);
		}
	}
});




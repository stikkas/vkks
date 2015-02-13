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
		if (me._saveBlank !== undefined)
			me.allowBlank = me._saveBlank;
		if (me.readOnly || me.hidden) {
			me.labelEl.setHtml(me.fieldLabel + me.labelSeparator);
			me._saveBlank = me.allowBlank;
			me.allowBlank = true;
		} else {
			if (!me.allowBlank) {
				me.labelEl.setHtml("<span>*</span>" + me.fieldLabel + me.labelSeparator);
//			me.addListener("change", requiredFieldChanged, null, me);
			} else {
				me.labelEl.setHtml(me.fieldLabel + me.labelSeparator);
			}
		}
	}
});




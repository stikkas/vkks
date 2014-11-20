/*
 * Переопределяем основной класс для полей формы.
 * Добавляем функциональность переключения между просмотром и редактированием
 * Устанавливаем общие настройки.
 */

Ext.define('Other.field.Base', {
	override: 'Ext.form.field.Base',
	labelSeparator: '',
	labelAlign: 'right',
	// режим просмотра
	viewMode: false,
	setViewOnly: function (mode) {
		if (this.viewMode !== mode) {
			if (mode)
				this.inputEl.dom.setAttribute('disabled', true);
			else
				this.inputEl.dom.removeAttribute('disabled');
			this.viewMode = mode;
		}
	},
	listeners: {
		afterrender: function () {
			if (this.viewMode)
				this.inputEl.dom.setAttribute('disabled', true);
		}
	},
	/**
	 * Устанавливает режим обязательности для поля формы
	 */
	setRequired: function () {
		var me = this;
		if (!(me.viewMode || me.allowBlank))
			me.labelEl.setHTML("<span>*</span>" + me.fieldLabel + me.labelSeparator);
	}
});




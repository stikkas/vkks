/*
 * Переопределяем основной класс для полей формы.
 * Добавляем функциональность переключения между просмотром и редактированием
 * Устанавливаем общие настройки.
 */

Ext.define('Other.field.Base', {
	overrides: 'Ext.form.field.Base',
	labelSepartor: '',
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
	}
});




/** 
 * Общий интерфейс для работы с делом / документом 
 */
Ext.define('Earh.view.work.Share', {
	/**
	 * Выгружаем данные в модель
	 */
	updateRecord: function () {
		this._frm.updateRecord(this.model);
		return this.model;
	},
	/**
	 * Проверка формы на валидность
	 * return {Boolean} true - если форма валидна
	 */
	isValid: function () {
		return this._frm.isValid();
	},
	/**
	 * Реализация общего интерфейса для всех страниц
	 * Для проверки несохраненных данных
	 * @returns {Boolean}
	 */
	isDirty: function () {
		if (this.model)
			return this.updateRecord().dirty;
		// Если модели нет, то об чем может быть речь - все чисто.
		return false;
	}
});



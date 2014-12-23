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
	},
	/**
	 * Сохраняет данные на сервере, если они изменились.
	 * Проверка на валидность данных должна делаться вызывающей стороной
	 * с помощью метода isValid. наследующий данный метод должен предаставить
	 * метод sucSave, который будет вызываться в случае удачного сохранения.
	 */
	save: function () {
		var view = this;
		if (view.isDirty()) {
			// Модель обновлена уже раньше, когда проверялась на несохраненные данные
			view.model.save({
				callback: function (model, operation, success) {
					if (success) {
						view.sucSave();
						showInfo("Результат", "Данные сохранены");
					} else {
						showError("Ошибка сохранения", operation.getError());
					}
				}
			});
		}
	}
});



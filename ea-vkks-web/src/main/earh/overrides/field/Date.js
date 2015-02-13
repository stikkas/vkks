/**
 * Параметры по умолчанию для Date.
 * Также удаляем неверную дату при переходе либо при нажатии Enter
 */
Ext.define('Other.field.Date', {
	override: 'Ext.form.field.Date',
	format: 'd.m.Y',
	initComponent: function() {
		var datefield = this;

		datefield.callParent();
		datefield.on('blur', function() {
			if (!datefield.isValid()) {
				datefield.reset();
				showError('Ошибка', "Введен не корректный формат данных");
			}
		});
		
		// Нужно для форм поиска, где осуществляется поиск по нажатию Enter
		datefield.on('specialkey', function(t, e){
			if (e.getKey() === e.ENTER && !datefield.isValid()) {
				datefield.reset();
				showError('Ошибка', "Введен не корректный формат данных");
			}
		});
	}
});




/**
 * Модель дела для создания и редактирования
 */
Ext.define('Earh.model.CCase', {
	extend: 'Earh.model.Case',
	constructor: function () {
		this.callParent([Urls.ccase]);
	}
});

/**
 * Модель дела для поиска по id
 */
Ext.define('Earh.model.SCase', {
	extend: 'Earh.model.Case',
	constructor: function () {
		this.callParent([Urls.scase]);
	}
});


Ext.define('Earh.Application', {
	extend: 'Ext.app.Application',
	requires: ['Earh.view.main.Main'],
	name: 'Earh',
	launch: function () {
		Ext.create('widget.eamain');
	},
	init: function () {
		// TODO - получение информации о пользователе
	}
});

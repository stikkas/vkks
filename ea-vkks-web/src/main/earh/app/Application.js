
Ext.define('Earh.Application', {
	extend: 'Ext.app.Application',
	requires: [
		'Earh.view.main.Main',
		'Other.field.Base',
		'Other.field.Number',
		'Other.field.Date',
		'Other.container.Container',
		'Ext.Msg'
	],
	name: 'Earh',
	launch: function () {
		Earh.user = "Иванов И. И.";
		Earh.editRole = true;
		Ext.create('widget.eamain');
		/*
		 Ext.Ajax.request({
		 url: Urls.user,
		 success: function (answer) {
		 var result = Ext.decode(answer.responseText),
		 roles = Earh.roles = result.roles;
		 Earh.user = result.user;

		 Earh.editRole = !!~roles.indexOf('CODE_OF_EDIT_ROLE');
		 if (Earh.editRole || ~roles.indexOf('CODE_OF_VIEW_ROLE'))
		 Ext.create('widget.eamain');
		 else {
		 showError("Ошибка", "Пользователь " + Earh.user + " не имеет прав для доступа к приложению");
		 window.location.href = Urls.logout;
		 }
		 }
		 });
		 */
	}
});

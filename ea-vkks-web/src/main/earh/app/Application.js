
Ext.define('Earh.Application', {
	extend: 'Ext.app.Application',
	requires: [
		'Earh.view.main.Main',
		'Other.field.Base',
		'Other.field.Number',
		'Other.field.Date',
		'Other.field.ComboBox',
		'Other.container.Container',
		'Other.ux.TreePicker',
		'Ext.Msg'
	],
	name: 'Earh',
	launch: function () {
//		Earh.user = "Иванов И. И.";
//		Earh.editRole = true;
//		Ext.create('widget.eamain');
		Ext.Ajax.request({
			url: Urls.user,
			success: function (answer) {
				var result = Ext.decode(answer.responseText);
				if (result.success) {
					roles = Earh.roles = result.data.access;
					Earh.user = result.data.user;
					Earh.userId = result.data.id;

					Earh.editRole = !!~roles.indexOf('EARCH_EDIT');

					if (Earh.editRole || ~roles.indexOf('EARCH_VIEW'))
						Ext.create('widget.eamain');
					else {
						showError("Ошибка", "Пользователь " + Earh.user + " не имеет прав для доступа к приложению");
						window.location.href = Urls.logout;
					}
				} else {
					showError("Ошибка", result.error);
				}
			},
			failure: function () {
				console.log(arguments);
			}
		});
	}
});

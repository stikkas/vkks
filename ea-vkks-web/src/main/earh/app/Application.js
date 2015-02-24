
Ext.define('Earh.Application', {
	extend: 'Ext.app.Application',
	requires: [
		'Earh.view.main.Main',
		'Other.field.Base',
		'Other.field.Number',
		'Other.field.Date',
		'Other.field.ComboBox',
		'Other.toolbar.Paging',
		'Other.container.Container',
		'Other.ux.TreePicker',
		'Other.picker.Date',
		'Other.data.Store',
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
					var roles = result.data.access;
					Earh.user = result.data.user;
					Earh.userId = result.data.id;

					Earh.editRole = !!~roles.indexOf('EARCH_EDIT');
					Earh.viewRole = !!~roles.indexOf('EARCH_VIEW');
					Earh.admGroupRole = !!~roles.indexOf('ADM_GROUP_MODE');
					Earh.admUserRole = !!~roles.indexOf('ADM_USER_MODE');
					Earh.admDictRole = !!~roles.indexOf('DESC_MODE');

//					if (Earh.editRole || ~roles.indexOf('EARCH_VIEW'))
						Ext.create('widget.eamain');
//					else {
//						showError("Ошибка", "Пользователь " + Earh.user + " не имеет прав для доступа к приложению", function () {
//							window.location.href = Urls.logout;
//						});
//					}
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

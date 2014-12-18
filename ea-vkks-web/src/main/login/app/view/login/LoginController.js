Ext.define('Login.view.login.LoginController', {
	extend: 'Ext.app.ViewController',
//	requires: ['Ext.data.proxy.LocalStorage',
//		'Ext.data.Model',
//		'Ext.data.Store'],
	alias: 'controller.login',
	enter: function () {
		var controller = this;
		Ext.Ajax.request({
			url: Urls.root + 'j_security_check',
			params: controller.view.getForm().getValues(),
			success: function (response) {
				if (~response.responseText.search(/<title>Login<\/title>/))
					showError("Ошибка ввода регистрационных сведений", "Введены неправильные<br>идентификационные данные");
				else {
					Ext.Ajax.request({
						url: Urls.user,
						success: function (answer) {
							var result = Ext.decode(answer.responseText);
							if (result.success) {

								var roles = result.data.access,
										adminrole = ~roles.indexOf('DESC_MODE') ||
										~roles.indexOf('ADM_USER_MODE') || ~roles.indexOf('ADM_GROUP_MODE'),
//										editrole = ~roles.indexOf('EARCH_EDIT'),
										docrole = ~roles.indexOf('EARCH_EDIT') || ~roles.indexOf('EARCH_VIEW');

								if (!(adminrole || docrole)) {
									showErrorAndExit("Ошибка", "Пользователь " + result.data.user + " не имеет прав для доступа к приложению");
									return;
								}
								/*
								 Ext.define('UserModel', {
								 extend: 'Ext.data.Model',
								 fields: [{name: 'id', type: 'string'},
								 {name: 'userid', type: 'int'},
								 {name: 'name', type: 'string'},
								 {name: 'write', type: 'boolean'}]
								 });
								 var userStore = Ext.create('Ext.data.Store', {
								 model: UserModel,
								 proxy: {
								 type: 'localstorage',
								 id: 'user'
								 }
								 });
								 var record = Ext.create('UserModel', {
								 id: 'current', userid: result.data.id,
								 name: result.data.user, write: editrole
								 });
								 userStore.add(record);
								 userStore.sync();
								 */
								if (adminrole && docrole) {
									controller.redirectTo(Pages.welcome);
								} else if (adminrole) {
									window.location.href = Urls.armadmin + "?back=" + Urls.logout;
								} else {
									window.location.href = Urls.root;
								}
							} else {
								showErrorAndExit("Ошибка", result.error);
							}
						},
						failure: function (response) {
							showErrorAndExit("Ошибка получения данных о пользователе", response.responseText);
						}
					});
				}
			},
			failure: function (response) {
				showErrorAndExit("Ошибка ввода регистрационных сведений", response.responseText);
			}
		});
	},
	exit: function () {
		showAlert("Предупреждение", "Вы точно хотите выйти из приложения?", 'onAnswer', this);
	},
	onSpecialKey: function (field, event) {
		if (event.getKey() === event.ENTER) {
			var fields = this.view.items;
			if (fields.getAt(0).getValue() && fields.getAt(1).getValue())
				this.enter();
		}
	},
	onAnswer: function (btn) {
		if (btn === "yes") {
			this.view.items.each(function (it) {
				it.reset();
			});
			this.fireEvent('exitEvent', this);
		}
	}
});


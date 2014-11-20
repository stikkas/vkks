Ext.define('Login.view.login.LoginController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.login',
	enter: function () {
		Ext.Ajax.request({
			url: 'j_security_check',
			params: this.view.getForm().getValues(),
			success: function (response) {
				if (~response.responseText.search(/<title>Login<\/title>/))
					showError("Ошибка авторизации", "Неправильный логин / пароль");
				else
					window.location.href = Urls.root;
			},
			failure: function (response) {
				showError("Ошибка авторизации", response.responseText);
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


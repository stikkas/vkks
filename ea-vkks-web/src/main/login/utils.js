// В этом файле находятся общие данные для всего приложения

// Т.к. у нас один язык, то используем упрощенную схему
Trans = {
	vkks: "высшая квалификационная коллегия судей российской федерации",
	docs: "Документы",
	admin: "Администратор",
	enter: "Вход",
	user: "Пользователь",
	pass: "Пароль"
};

Pages = {
	welcome: 'welcome',
	login: 'login'
};

Urls = {
	root: '/ea-vkks-web/',
	user: '/ea-vkks-web/srvcs/user',
	logout: '/ea-vkks-web/srvcs/logout',
	armadmin: '/arm-admin/'
};
/**
 * Показывает ошибки в диалоговом окне
 * @param {String} title заголовок окна
 * @param {String} message сообщение об ошибке
 * @method showError
 */
showError = function (title, message) {
	if (message instanceof Object) {
		if (message.statusText) {
			message = message.statusText;
		} else {
			console.log(message);
			return;
		}
	}
	Ext.Msg.show({
		title: title,
		msg: message,
		buttons: Ext.Msg.OK,
		icon: Ext.Msg.ERROR,
		maxWidth: 800
	});
};
/**
 * Показывает сообщение об ошибке и перенаправляет на начальную страницу
 * @param {String} title заголовок окна
 * @param {String} message сообщение об ошибке
 * @method showErrorAndExit
 */
showErrorAndExit = function (title, message) {
	function exit() {
		window.location.href = Urls.logout;
	}

	if (message instanceof Object) {
		if (message.statusText) {
			message = message.statusText;
		} else {
			console.log(message);
			exit();
			return;
		}
	}
	Ext.Msg.show({
		title: title,
		msg: message,
		buttons: Ext.Msg.OK,
		icon: Ext.Msg.ERROR,
		fn: exit,
		maxWidth: 800
	});
};
/**
 * Показывает предупреждение в диалоговом окне
 * @param {String} title заголовок окна
 * @param {String} message сообщение об ошибке
 * @param {Function} fn обработчик ответа от пользователя
 * @param {Object} scope контекст вызова обработчика
 * @method showError
 */
showAlert = function (title, message, fn, scope) {
	Ext.Msg.show({
		title: title,
		msg: message,
		buttons: Ext.Msg.YESNO,
		icon: Ext.Msg.QUESTION,
		fn: fn,
		scope: scope,
		maxWidth: 800
	});
};

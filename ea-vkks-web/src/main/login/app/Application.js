
Ext.define('Login.Application', {
	extend: 'Ext.app.Application',
	requires: [
		'Login.view.main.Main',
		'Ext.Msg'
	],
	name: 'Login',
	launch: function () {
		Ext.create('widget.eamain');
	}
});

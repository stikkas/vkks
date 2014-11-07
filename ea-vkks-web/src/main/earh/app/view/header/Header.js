Ext.define('Earh.view.header.Header', {
	extend: 'Ext.container.Container',
	alias: 'widget.eaheader',
	requires: [
		'Ext.toolbar.Toolbar',
		'Ext.layout.container.HBox',
		'Ext.layout.container.VBox',
		'Ext.container.Container',
		'Ext.form.Label',
		'Ext.button.Button'
	],
	layout: {
		type: 'hbox'
	},
	initComponent: function () {
		var headerView = this;
		headerView.items = [{
				xtype: 'component',
				baseCls: 'gerb',
				width: 100,
				height: 100
			},
			{
				xtype: 'container',
				layout: 'vbox',
				items: [
					{
						xtype: 'component',
						html: '<h1>' + Trans.vkks + '</h1>'
					}, {
						xtype: 'toolbar',
						minWidth: 1100,
						defaults: {
							xtype: 'button'
						},
						items: [{
								text: Trans.main
							},
							' ',
							{
								text: Trans.search
							}, {
								text: Trans.clear
							}, {
								text: Trans.add
							},
							'->',
							{
								xtype: 'label',
								text: 'Пользователь'
							},
							'-',
							{
								text: Trans.exit,
								handler: 'exit'
							}
						]
					}]
			}
		];
		headerView.callParent();
	}
});



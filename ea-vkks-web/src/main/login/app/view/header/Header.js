Ext.define('Login.view.header.Header', {
	extend: 'Ext.container.Container',
	alias: 'widget.eaheader',
	requires: [
		'Ext.layout.container.HBox',
		'Ext.layout.container.VBox',
		'Ext.container.Container'
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
				items: [{
						xtype: 'component',
						html: '<h1>' + Trans.vkks + '</h1>'
					}]
			}
		];
		headerView.callParent();
	}
});



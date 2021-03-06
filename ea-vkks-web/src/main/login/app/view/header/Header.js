Ext.define('Login.view.header.Header', {
	extend: 'Ext.container.Container',
	alias: 'widget.eaheader',
        cls:'header_cls',
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
				baseCls: 'gerb'
			},
			{
				xtype: 'container',
				layout: 'vbox',
                                cls:'title_head',
				items: [{
						xtype: 'component',
						html: '<h1>' + Trans.vkks + '</h1>'
					}]
			}];
		headerView.callParent();
	}
});



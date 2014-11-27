Ext.define('Earh.view.header.Header', {
	extend: 'Ext.container.Container',
	alias: 'widget.eaheader',
        cls:'header_cls',
	requires: [
		'Ext.toolbar.Toolbar',
		'Ext.layout.container.HBox',
		'Ext.layout.container.VBox',
		'Ext.toolbar.Fill',
		'Ext.toolbar.Spacer',
		'Ext.toolbar.Separator',
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
				baseCls: 'gerb'
			}, {
				xtype: 'container',
                                cls:'title_head',
				layout: 'vbox',
				items: [
					{
						xtype: 'component',
                                                cls:'title_head',
						html: '<h1>' + Trans.vkks + '</h1>'
					},
					headerView._tb = Ext.create('Ext.toolbar.Toolbar', {
						//minWidth: 1050,
                                                cls:'buttons_menu',
						defaults: {
							xtype: 'button'
						},
						items: [{
								text: Trans.main,
								handler: 'toMain'
							}, {
								text: Trans.backToSearch,
								handler: 'backToSearch'
							}, {
								text: Trans.backToCase,
								handler: 'backToCase'
							},
							' ',
							{
								text: Trans.search,
								handler: 'search'
							}, {
								text: Trans.save,
								handler: 'save'
							}, {
								text: Trans.remove,
								handler: 'remove'
							}, {
								text: Trans.edit,
								handler: 'edit'
							},
							'->',
							{
								xtype: 'label',
								text: Earh.user,
                                                                cls:'user_cls'
							},
							{
								text: Trans.exit,
								handler: 'onExit',
                                                                cls:'exit_cls'
							}]
					})]
			}
		];
		headerView.callParent();
	},
	hideTB: function () {
		this._tb.hide();
	},
	/**
	 * Показывает тольк выбранные кнопки
	 * @param {Boolean[]} buttons булевые значения для вкл/выкл кнопок
	 */
	showTB: function (buttons) {
		this._tb.show();
		this._tb.items.each(function (btn, idx) {
			btn.setVisible(buttons[idx]);
		});
	}
});



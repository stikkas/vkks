Ext.define('Earh.view.header.Header', {
	extend: 'Ext.container.Container',
	alias: 'widget.eaheader',
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
					},
					headerView._tb = Ext.create('Ext.toolbar.Toolbar', {
						minWidth: 1100,
						defaults: {
							xtype: 'button'
						},
						items: [{
								text: Trans.main
							}, {
								text: Trans.backToSearch
							},
							' ',
							{
								text: Trans.search
							}, {
								text: Trans.clear
							}, {
								text: Trans.add // Графический образ
							}, {
								text: Trans.add // Дело
							}, {
								text: Trans.add // Документ
							}, {
								text: Trans.edit
							}, {
								text: Trans.save
							}, {
								text: Trans.del
							}, {
								text: Trans.graphs
							}, {
								text: Trans.caseDocs
							}, {
								text: Trans.backToCard
							},
							'->',
							{
								xtype: 'label',
								text: 'Заслонка'
							},
							'-',
							{
								text: Trans.exit,
								handler: 'exit'
							}
						]
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



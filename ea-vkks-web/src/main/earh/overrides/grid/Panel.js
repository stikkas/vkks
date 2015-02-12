/*
 * Переопределяем класс грида
 */

Ext.define('Other.grid.Panel', {
	override: 'Ext.grid.Panel',
	initComponent: function () {
		this.callParent();
		/*
		this.on('afterrender', function (me) {
			me.getView().on('beforecellmousedown', function () {
				me.fireEvent('savescroll');
			});
		});
		*/
	}
});

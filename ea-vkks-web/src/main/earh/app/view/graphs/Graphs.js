/**
 * Форма графические образы
 */
Ext.define('Earh.view.graphs.Graphs', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.graphs',
	tbb: [1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
	initComponent: function () {
		this.title = Trans.graphS;
		this.callParent();
	}
});



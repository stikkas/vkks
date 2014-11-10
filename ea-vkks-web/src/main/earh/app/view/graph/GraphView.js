/**
 * Панель просмотра графических образов
 */
Ext.define('Earh.view.graph.GraphView', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.graphview',
	tbb: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
	initComponent: function () {
		this.title = Trans.graphsView;
		this.callParent();
	}
});


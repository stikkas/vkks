/**
 * Модель для графического образа
 */
Ext.define('Earh.model.Graph', {
	extend: 'Ext.data.Model',
	uses: ['Earh.model.Doc'],
	fields: ['id', 'url'],
	belongsTo: 'Earh.model.Doc'
});



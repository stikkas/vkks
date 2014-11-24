/**
 * Модель для создания, обновления и удаления документа
 */
Ext.define('Earh.model.Doc', {
	extend: 'Ext.data.Model',
	uses: 'Earh.model.Graph',
	fields: ['id', 'volume',
		'acase', 'number', 'type', 'title', 'startPage',
		'endPage', 'date', 'remark', 'court', 'fio'],
	associations: [
		{type: 'hasOne', model: 'Earh.model.Graph', foreingKey: 'id',
			setterName: 'setGraph', getterName: 'getGraph'}
	]
});



/**
 * Хранилище для найденных документов дела
 */
Ext.define('Earh.store.Doc', {
	extend: 'Ext.data.Store',
	model: 'Earh.model.DocResult',
	proxy: {
	}
});

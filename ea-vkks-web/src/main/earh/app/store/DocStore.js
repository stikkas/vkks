/** 
 * Хранилище для получения документа дела (с моделью не знаю как передать параметры, кроме id)
 */
Ext.define('Earh.store.DocStore', {
	extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.Ajax'],
	model: 'Earh.model.Doc',
	constructor: function () {
		this.callParent();
		this.setProxy(Ext.create('Ext.data.proxy.Ajax', {
			url: Urls.sdoc,
			type: 'json',
			writer: 'json'
		}));
	}
});



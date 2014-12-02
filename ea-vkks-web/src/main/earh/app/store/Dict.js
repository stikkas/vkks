/**
 * Базовый класс для плоских справочников
 */
Ext.define('Earh.store.Dict', {
	extend: 'Ext.data.Store',
	model: 'Earh.model.Dict',
	requires: ['Ext.data.proxy.Ajax'],
//	proxy: {
//		type: 'memory'
//	},
	constructor: function (dict) {
		this.callParent();
		this.setProxy(Ext.create('Ext.data.proxy.Ajax', {
			url: Urls.dict,
			reader: 'json',
			writer: 'json',
			extraParams: {
				action: Actions.plain,
				dict: dict
			}
		}));
	}
});




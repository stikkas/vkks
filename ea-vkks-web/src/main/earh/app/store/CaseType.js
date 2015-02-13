/**
 * Справочник "Тип архивного дела"
 */
Ext.define('Earh.store.CaseType', {
	extend: 'Ext.data.Store',
	storeId: 'caseTypeStore',
	requires: ['Ext.data.proxy.Ajax'],
	fields: ['id', 'name', 'code', 'case_type_index'],
	constructor: function () {
		this.callParent();
		this.setProxy(Ext.create('Ext.data.proxy.Ajax', {
			url: Urls.dict,
			reader: 'json',
			writer: 'json',
			extraParams: {
				action: Actions.plain,
				dict: Dicts.casetype,
				attrs: true
			}
		}));
	}
});

/**
 * Модель для критериев поиска дел (Форма "Поиск дел")
 */
Ext.define('Earh.model.CasesQuery', {
	extend: 'Ext.data.Model',
	idProperty: 'number',
	fields: [
		{name: 'number', type: 'string', defaultValue: null, convert: function (v) {
				if (!v)
					return null;
				return v;
			}
		},
		{name: 'type', type: 'int', defaultValue: null, convert: null},
		{name: 'storeLife', type: 'int', defaultValue: null, convert: null},
		{name: 'title', type: 'string', defaultValue: null, convert: function (v) {
				if (!v)
					return null;
				return v;
			}
		},
		{name: 'startDate', type: 'date', defaultValue: null, convert: null},
		{name: 'endDate', type: 'date', defaultValue: null, convert: null},
		{name: 'toporef', type: 'int', defaultValue: null, convert: null},
		{name: 'remark', type: 'string', defaultValue: null, convert: function (v) {
				if (!v)
					return null;
				return v;
			}
		}
	]
});


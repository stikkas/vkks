/**
 * Модель для критериев поиска дел (Форма "Поиск дел")
 */
Ext.define('Earh.model.CasesQuery', {
	extend: 'Ext.data.Model',
	idProperty: 'numPrefix',
	fields: [
		{name: 'numNumber', type: 'int', defaultValue: null, convert: null},
		{name: 'numPrefix', type: 'string', defaultValue: null, convert: function (v) {
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
		{name: 'startDate', type: 'date', defaultValue: null, convert: function (v) {
				if (!(v && Ext.Date.format(v, 'd.m.Y')))
					return null;
				return v;
			}
		},
		{name: 'endDate', type: 'date', defaultValue: null, convert: function (v) {
				if (!(v && Ext.Date.format(v, 'd.m.Y')))
					return null;
				return v;
			}
		},
		{name: 'court', type: 'string', defaultValue: null, convert: function (v) {
				if (!v)
					return null;
				return v;
			}},
		{name: 'fio', type: 'string', defaultValue: null, convert: function (v) {
				if (!v)
					return null;
				return v;
			}},
		{name: 'toporef', type: 'int', defaultValue: null, convert: null},
		{name: 'remark', type: 'string', defaultValue: null, convert: function (v) {
				if (!v)
					return null;
				return v;
			}
		}
	]
});


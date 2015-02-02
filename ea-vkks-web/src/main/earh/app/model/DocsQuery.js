/**
 * Модель для критериев поиска документов
 */
Ext.define('Earh.model.DocsQuery', {
	extend: 'Ext.data.Model',
	idProperty: 'number',
	fields: [
//		{name: 'volume', type: 'int', defaultValue: null, convert: null},
		{name: 'number', type: 'string', defaultValue: null, convert: function (v) {
				if (!v)
					return null;
				return v;
			}},
		{name: 'type', type: 'int', defaultValue: null, convert: null},
		{name: 'title', type: 'string', defaultValue: null, convert: function (v) {
				if (!v)
					return null;
				return v;
			}},
//		{name: 'startPage', type: 'int', defaultValue: null, convert: null},
//		{name: 'endPage', type: 'int', defaultValue: null, convert: null},
		{name: 'startDate', type: 'date', defaultValue: null, convert:  function (v) {
				if (!(v && Ext.Date.format(v, 'd.m.Y')))
					return null;
				return v;
			}
		},
		{name: 'endDate', type: 'date', defaultValue: null, convert:  function (v) {
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
		{name: 'remark', type: 'string', defaultValue: null, convert: function (v) {
				if (!v)
					return null;
				return v;
			}},
		{name: 'fio', type: 'string', defaultValue: null, convert: function (v) {
				if (!v)
					return null;
				return v;
			}},
		{name: 'context', type: 'string', defaultValue: null, convert: function (v) {
				if (!v)
					return null;
				return v;
			}}
	]
});



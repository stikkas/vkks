/**
 * Модель для использования в хранилищах, которые на входе получают
 * массив простых элементов(не объектов)
 */
Ext.define('Earh.model.SingleDimArray', {
	extend: 'Ext.data.Model',
	fields: [{name: 'text', convert: function (value, record) {
				return record.data;
			}
		}]
});

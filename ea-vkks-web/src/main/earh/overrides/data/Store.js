/**
 * Переопределяем метод sort, чтобы после того как очистили хранилище
 * не выполнялась удаленная сортировка, которая приносит данные с сервера
 */
Ext.define('Other.data.Store', {
	override: 'Ext.data.Store',
	sort: function () {
		if (this.count() > 0)
			this.callParent();
	}
});




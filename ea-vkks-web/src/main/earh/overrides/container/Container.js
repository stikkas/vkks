/**
 * Добавляет различные методы к контейнеру и его потомкам
 */
Ext.define('Other.container.Container', {
	override: 'Ext.container.Container',
	/**
	 * применяем метод ко всем компанентам контейнера
	 * @param {String} method название метода
	 * @param {Array} opts аргументы для метода
	 */
	applyAll: function (method, opts) {
		this.items.each(function (it) {
			try {
				it[method].apply(it, opts);
			} catch (e) {

			}
		});
	}
});



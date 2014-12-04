/**
 * Главная страница. Каждая страница имеет свойство tbb,
 * в котором перечесляются нулями и единицами, кнопки панели инструментов:
 * 0 - кнопка не будет показана,
 * 1 - кнопка будет показана.
 */
Ext.define('Earh.view.home.Home', {
	extend: 'Ext.container.Container',
	alias: 'widget.home',
	cls: 'main_page',
	requires: [
		'Ext.layout.container.HBox',
		'Ext.button.Button'
	],
	layout: 'hbox',
	initComponent: function () {
		this.items = [{
				xtype: 'container',
				layout: 'vbox',
				cls: 'deal_cls',
				items: [{
						xtype: 'button',
						text: Trans.caseSearch,
						handler: 'toCasesSearch'
					}, {
						xtype: 'button',
						text: Trans.caseAdd,
						handler: 'addCase',
						hidden: !Earh.editRole
					}]
			}, {
				xtype: 'button',
				text: Trans.docSearch_,
				handler: 'toDocsSearch',
				cls: 'doc_cls'
			}];
		this.callParent();
		this.tbb = [0, // Главная
			0, // Вернуться к результатам поиска
			0, // Вернуться в дело
			0, // пробел
			0, // Поиск
			0, // Сохранить
			0, // Удалить
			0, // Редактировать
			1, // сдвиг вправо
			1, // ФИО
			1, // разделитель
			1];// Выход
	},
	/**
	 * Реализация общего интерфейса для всех страниц
	 * Для проверки несохраненных данных
	 * @returns {Boolean}
	 */
	isDirty: function () {
		return false;
	}
});

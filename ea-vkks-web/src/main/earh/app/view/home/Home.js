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
		'Ext.layout.container.VBox',
		'Ext.layout.container.Column',
		'Ext.Component',
		'Ext.button.Button'
	],
	layout: 'vbox',
	initComponent: function () {
		this.items = [{
				xtype: 'container',
				layout: 'hbox',
				width: '100%',
				cls: 'content_main_page',
				items: [{
						xtype: 'container',
						layout: 'vbox',
                                                cls: 'main_col_vkks',
						items: [{
								xtype: 'component',
								html: Trans.docs
							}, {
								xtype: 'button',
								text: Trans.caseSearch,
								handler: 'toCasesSearch'
							}, {
								xtype: 'button',
								text: Trans.caseAdd,
								handler: 'addCase',
								hidden: !Earh.editRole
							}, {
								xtype: 'component',
								width: '80%'
							}, {
								xtype: 'button',
								text: Trans.docSearch_,
								handler: 'toDocsSearch',
								cls: 'doc_cls'
							}]
					}, {
						xtype: 'container',
						layout: 'vbox',
                                                cls: 'main_col_adm',
						items: [{
								xtype: 'component',
								html: Trans.admin
							}, {
								xtype: 'button',
								text: Trans.dicts
							}, {
								xtype: 'component',
								html: Trans.accessControl
							}, {
								xtype: 'button',
								text: Trans.users
							}, {
								xtype: 'button',
								text: Trans.groups
							}]
					}]
			}, {
				xtype: 'component',
				html: Trans.version
			}
		];
		this.callParent();
		this.tbb = [0, // Главная
			0, // Вернуться к результатам поиска
			0, // Вернуться в дело
			0, // пробел
			0, // Поиск дел
			0, // Поиск 			
			0, // Очистить
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

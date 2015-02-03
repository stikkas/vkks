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
		var home = this,
				items = [],
				accessRole;

		if (Earh.viewRole || Earh.editRole) {
			var docControls = {
				xtype: 'container',
				layout: 'vbox',
                                cls: 'main_col_vkks',
				items: [{
						xtype: 'component',
						html: Trans.docs,
                                                cls:'doc_cls'
					}, {
						xtype: 'button',
						text: Trans.caseSearch,
						handler: 'toCasesSearch'
					}]};

			if (Earh.editRole)
				docControls.items.push({
					xtype: 'button',
					text: Trans.caseAdd,
					handler: 'addCase'
				});

			docControls.items.push({
				xtype: 'component',
                                cls:'hor_line'
			});
			docControls.items.push({
				xtype: 'button',
				text: Trans.docSearch_,
				handler: 'toDocsSearch'
			});
			items.push(docControls);
		}

		if ((accessRole = Earh.admGroupRole || Earh.admUserRole) || Earh.admDictRole) {
			var adminControls = {
				xtype: 'container',
				layout: 'vbox',
                                cls: 'main_col_adm',
				items: [{
						xtype: 'component',
						html: Trans.admin,
                                                cls:'adm_cls'
					}]};

			if (Earh.admDictRole)
				adminControls.items.push({
					xtype: 'button',
					text: Trans.dicts,
					href: Urls.admDicts,
					hrefTarget: '_self'
				});

			if (accessRole) {
				adminControls.items.push({
					xtype: 'component',
					html: Trans.accessControl,
                                        cls:'inside_label'
				});

				if (Earh.admUserRole)
					adminControls.items.push({
						xtype: 'button',
						text: Trans.users,
						href: Urls.admUsers,
						hrefTarget: '_self'
					});

				if (Earh.admGroupRole)
					adminControls.items.push({
						xtype: 'button',
						text: Trans.groups,
						href: Urls.admGroups,
						hrefTarget: '_self'
					});
			}
			items.push(adminControls);
		}

		home.items = [{
				xtype: 'container',
				layout: 'hbox',
				width: '100%',
				items: items,
				cls: 'content_main_page'
			}, {
				xtype: 'component',
				html: Trans.version,
                                cls:'ver_num'
			}
		];
		home.callParent();
		home.tbb = [0, // Главная
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

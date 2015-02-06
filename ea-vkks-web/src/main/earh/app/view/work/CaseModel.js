/** 
 * Модель вида для карточки дела
 */
Ext.define('Earh.view.work.CaseModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.acase',
	formulas: {
		title: function(get) {
			return Trans.acase + get('view');
		}
	}
});



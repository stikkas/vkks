/*
 * Карточка документа
 */

Ext.define('Earh.view.doc.Doc', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.adoc',
	requires: [
		'Ext.layout.container.VBox',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Text',
		'Ext.form.field.Date',
		'Ext.form.field.TextArea',
		'Ext.form.field.Number',
		'Ext.toolbar.Paging'
	],
	tbb: [1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
	defaults: {
		labelWidth: 200,
		labelAlign: 'right',
		labelSeparator: ''
	},
	layout: 'vbox',
	initComponent: function () {
		var docCard = this;
		docCard.title = Trans.doc;
		docCard.items = [{
				xtype: 'combobox',
				fieldLabel: Trans.caseType
			}, {
				xtype: 'textfield',
				fieldLabel: Trans.docNum
			}, {
				xtype: 'datefield',
				fieldLabel: Trans.docDate
			}, {
				xtype: 'textarea',
				fieldLabel: Trans.docTitle
			}, {
				xtype: 'numberfield',
				fieldLabel: Trans.startPageNum
			}, {
				xtype: 'numberfield',
				fieldLabel: Trans.endPageNum
			}, {
				xtype: 'textarea',
				fieldLabel: Trans.remark
			}, {
				xtype: 'textfield',
				fieldLabel: Trans.caseSubject
			}, {
				xtype: 'combobox',
				fieldLabel: Trans.court
			}];
		docCard.dockedItems = [{
				xtype: 'pagingtoolbar',
				dock: 'top',
				firstText: Trans.firstDoc,
				lastText: Trans.lastDoc,
				prevText: Trans.prevDoc,
				nextText: Trans.nextDoc,
				beforePageText: Trans.doc
						//
//							store: 'TODO'
			}];
		docCard.callParent();
	}
})

/**
 * Делаем TreePicker (комобобокс с выборкой из дерева)
 * таким каким он нам нужен
 */
Ext.define('Other.ux.TreePicker', {
	override: 'Ext.ux.TreePicker',
	displayField: 'text',
	valueField: 'id',
	createPicker: function () {
		var me = this,
				picker = new Ext.tree.Panel({
					shrinkWrapDock: 2,
					store: me.store,
					floating: true,
					rootVisible: false, // Этого в оригинальной версии нет
					displayField: me.displayField,
					columns: me.columns,
					maxHeight: 100, // Исправляем прокрутку
					scroll: 'vertical',
					listeners: {
						scope: me,
						itemclick: me.onItemClick
					},
					viewConfig: {
						listeners: {
							scope: me,
							render: me.onViewRender
						},
						navigationModel: 'boundlist'
					}
				}),
				view = picker.getView();

		if (Ext.isIE9 && Ext.isStrict) {
			// In IE9 strict mode, the tree view grows by the height of the horizontal scroll bar when the items are highlighted or unhighlighted.
			// Also when items are collapsed or expanded the height of the view is off. Forcing a repaint fixes the problem.
			view.on({
				scope: me,
				highlightitem: me.repaintPickerView,
				unhighlightitem: me.repaintPickerView,
				afteritemexpand: me.repaintPickerView,
				afteritemcollapse: me.repaintPickerView
			});
		}
		return picker;
	},
	/**
	 * Возвращает пикер к первоначальному состоянию
	 */
	initPicker: function () {
		this.getPicker().collapseAll();
	},
	setValue: function (value) {
		var me = this,
				record;

		me.value = value;

		if (me.store.loading) {
			// Called while the Store is loading. Ensure it is processed by the onLoad method.
			return me;
		}

		// try to find a record in the store that matches the value
		record = value ? me.store.getNodeById(value) : me.store.getRoot();
		if (value === undefined) {
			record = me.store.getRoot();
			me.value = record.getId();
		} else {
			record = me.store.getNodeById(value);
		}

		// set the raw value to the record's display field if a record was found
		// me.setRawValue(record ? record.get(me.displayField) : '');
		// Заменяем нашим значением
		if (record) {
//			var path = [];
//			while (true) {
//				if (record.parentNode) {
//					path.unshift(record.get(me.displayField));
//					record = record.parentNode;
//				} else
//					break;
//			}
//			me.setRawValue(path.join(','));
			me.setRawValue(record.get('path'));
		} else {
			me.setRawValue('');
		}
		return me;
	},
	getValue: function () {
		var value = this.callParent();
		return value === 'root' ? null : value;
	},
	onItemClick: function (view, record, node, rowIndex, e) {
		if (this.leafOnly) { // Можно выбирать только листья
			if (record.get('leaf'))
				this.selectItem(record);
		} else
			this.selectItem(record);
	}
});




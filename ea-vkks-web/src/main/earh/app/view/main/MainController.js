(function () {
	var viewport;
	var newCard;
	Ext.define('Earh.view.main.MainController', {
		extend: 'Ext.app.ViewController',
		requires: [
			'Ext.MessageBox'
		],
		alias: 'controller.main',
		init: function () {
			viewport = this.view;
		},
		onClickButton: function () {
			Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
		},
		onConfirm: function (choice) {
			if (choice === 'yes') {
				//
			}
		},
		exit: function (exitButton) {
			var newItem;
			if (!newCard) {
				newCard = newItem = Ext.widget('docsearch');
			} else {
				var currentItem = viewport.getActiveItem(),
						newItem = currentItem.cardId + 1;
				if (newItem >= viewport._center.items.length)
					newItem = 0;
			}
			viewport.setActiveItem(newItem);
		}
	});
})();
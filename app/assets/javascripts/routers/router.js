Greedly.Routers.Router = Backbone.Router.extend({
	
	initialize: function (options) {
		this.$rootEl = options.$rootEl
	},
	
	routes: {
		'': 'index',
		'businesses/:id': 'show'
	},
	
	index: function () {
		Greedly.businesses.fetch();
	},
	
	show: function (id) {
		var model = Greedly.businesses.getOrFetch(id);
		var busShow = new Greedly.Views.BusinessShow({
			model: model
		});
		this._swapView(busShow);
	},
	
	_swapView: function (view) {
		if (this._currentView) {
			this._currentView.remove();
		}
		this._currentView = view;
		this.$rootEl.html(this._currentView.render().$el); 
	},
})
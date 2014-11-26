Greedly.Routers.Router = Backbone.Router.extend({
	
	initialize: function (options) {
		this.$rootEl = options.$rootEl,
		this.$sidebar = options.$sidebar
	},
	
	routes: {
		'': 'index',
		'businesses/:id': 'show'
	},
	
	index: function () {
		// call article index here
		Greedly.articles.fetch()
		var artIndex = new Greedly.Views.ArticleIndex({
			collection: Greedly.articles
		});
		this._swapView(artIndex, this.$rootEl);
	},
	
	show: function (id) {
		var model = Greedly.businesses.getOrFetch(id);
		var busShow = new Greedly.Views.BusinessShow({
			model: model
		});
		this._swapView(busShow, this.$rootEl);
	},
	
	_swapView: function (view, $htmlEl) {
		if (this._currentView) {
			this._currentView.remove();
		}
		this._currentView = view;
		$htmlEl.html(this._currentView.render().$el); 
	},
})
Greedly.Routers.Router = Backbone.Router.extend({
	
	initialize: function (options) {
		this.$rootEl = options.$rootEl,
		this.$sidebar = options.$sidebar,
		this.$backdrop = options.$backdrop
	},
	
	routes: {
		'': 'index',
		'businesses/:id': 'show',
		'discover': 'categoryIndex'
	},
	
	index: function () {
		// call article index here
		// Greedly.articles.fetch()
// 		var artIndex = new Greedly.Views.ArticleIndex({
// 			collection: Greedly.articles
// 		});
// 		this._swapView(artIndex, this.$rootEl);
		
		Greedly.businesses.fetch();
		var busIndex = new Greedly.Views.BusinessIndex({
			collection: Greedly.businesses,
			subcol: Greedly.subscriptions
		})
		this._swapView(busIndex, this.$rootEl)
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
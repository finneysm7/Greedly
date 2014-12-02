Greedly.Routers.Router = Backbone.Router.extend({
	
	initialize: function (options) {
		this.$rootEl = options.$rootEl,
		this.$sidebar = options.$sidebar,
		this.$backdrop = options.$backdrop
		//need to add event listener here for searching fucntionality
		this.$rootEl.on('submit', 'funTimes')
		//DecodeURIComponent
	},
	
	routes: {
		'': 'index',
		'businesses/:id': 'show',
		'search/?business%3D:term': 'search'
	},
	
	search: function(query){
		//alert('you searched for ' + query);
		//filter the passed collection by title
		var queryCorrect = decodeURIComponent(query);
		debugger
		var pass_col = Greedly.businesses.search(queryCorrect)
		var searchShow = new Greedly.Views.SearchShow({
			collection: pass_col
		});
		this._swapView(searchShow, this.$rootEl);
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
		});
		this._swapView(busIndex, this.$rootEl);
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
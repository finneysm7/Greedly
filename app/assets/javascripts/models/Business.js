Greedly.Models.Business = Backbone.Model.extend({
	urlRoot: '/api/businesses',
	
	articles: function () {
		if(!this._articles) {
			this._articles = new Greedly.Collections.Articles([], { business: this});
		}
		return this._articles;
	},
	
	parse: function (response) {
		if (response.latest_articles) {
			this.articles().set(response.latest_articles);
			delete response.latest_articles;
		}
		
		return response;
	}
});
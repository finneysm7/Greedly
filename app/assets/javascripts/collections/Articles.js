Greedly.Collections.Articles = Backbone.Collection.extend({
	url: '/api/businesses',
	model: Greedly.Models.Article,
	
	initialize: function(models, options){
		this.business = options.business;
	},
	
	comparator: function(article){
		return article.get('published_at');
	},
	
	getOrFetch: function (id) {
		var model = this.get(id);
		if (model) {
			model.fetch();
		} else {
			model = new Greedly.Models.Article({id: id});
			var that = this;
			model.fetch({
				success: function () {
					that.add(model)
				}
			});
		}
		return model;
	}
})
Greedly.Collections.Articles = Backbone.Collection.extend({
	url: '/api/articles',
	model: Greedly.Models.Article,
	
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
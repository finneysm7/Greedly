Greedly.Collections.Categories = Backbone.Collection.extend({
	url: '/api/categories',
	model: Greedly.Models.Category,
	
	getOrFetch: function (id) {
		var model = this.get(id);
		if (model) {
			model.fetch();
		} else {
			model = new Greedly.Models.Category({id: id});
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
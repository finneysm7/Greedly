Greedly.Collections.Businesses = Backbone.Collection.extend({
	url: '/api/businesses',
	model: Greedly.Models.Business,
	
	getOrFetch: function (id) {
		var model = this.get(id);
		if (model) {
			model.fetch();
		} else {
			model = new Greedly.Models.Business({id: id});
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
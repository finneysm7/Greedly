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
	},
	
	search: function (query) {
		result_collection = new Greedly.Collections.Businesses();
		var results = this.filter(function (model) {
			// if model's title matches search query, return true
			// else false
			var matchedExp = new RegExp(query, 'i');
			var thing = model.get('title').match(matchedExp);
			if (thing) {
				return true;
			} else {
				return false;
			}
		});
		
		// this.each(function (business) {
// 			if (business.get('title') == query) {
// 				result_collection.add(business)
// 			}
// 		});
        
        // set result_collection's models to the results array
		// return result_collection
		result_collection.set(results);
		return result_collection
	}   
})
Greedly.Models.Category = Backbone.Model.extend({
	urlRoot: '/api/categories',
	
	businesses: function () {
		if(!this._businesses) {
			this._businesses = new Greedly.Collections.Businesses();
		}
		return this._businesses;
	},
	
	parse: function (response) {
		if (response.businesses) {
			this.businesses().set(response.businesses);
			delete response.businesses;
		}		
		return response;
	}
});
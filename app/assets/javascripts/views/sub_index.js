Greedly.Views.SubIndex = Backbone.CompositeView.extend({
	template: JST['sub_index'],
	
	initialize: function () {
		this.listenTo(this.collection, 'sync', this.addAllBusinesses);
	},
	
	addAllBusinesses: function () {
		this.collection.each(function (sub) {
			var biz = Greedly.businesses.get(sub.get('business_id'));
			this.addBusiness(biz);
		}.bind(this));
	},
	
	render: function () {
		var that = this
		this.$el.html(that.template());
		this.attachSubviews();
		return this;
	},
	
	addBusiness: function (business) {
		var view = new Greedly.Views.BusinessListItem({
			model: business,
			subcol: this.subcol
		});
		this.addSubview('#sub-businesses-wrapper', view);
	},
	
	renderBusinessListItems: function () {
		this.collection.each(this.addBusiness.bind(this));
	}
})
Greedly.Views.SubIndex = Backbone.CompositeView.extend({
	template: JST['sub_index'],
	
	initialize: function () {
		this.addAllBusinesses();
		this.listenTo(this.collection, 'add', this.addBusiness);
		this.listenTo(this.collection, 'remove', this.removeBusiness);
	},
	
	addAllBusinesses: function () {
		this.collection.each(function (sub) {
			var biz = Greedly.businesses.get(sub.get('business_id'));
			this.addBusiness(biz);
		}.bind(this));
	},
	
	render: function () {
		this.$el.html(this.template());
		this.attachSubviews();
		return this;
	},
	
	addBusiness: function (sub) {
		var that = this;
		var business = Greedly.businesses.getOrFetch(sub.get('business_id'))
		var view = new Greedly.Views.BusinessListItem({
			model: business,
			subcol: that.collection
		});
		this.addSubview('#sub-businesses-wrapper', view);
	},
	
	removeBusiness: function (sub) {
		var view = this;
		var business = Greedly.businesses.getOrFetch(sub.get('business_id'));
		
		_(this.subviews()).each(function (subviews, selector){
			_(subviews.slice(0)).each(function (subview){
				if (subview.model === business) {
					view.removeSubview(selector, subview);
					return;
				}
			});
		});
	},
	
	renderBusinessListItems: function () {
		this.collection.each(this.addBusiness.bind(this));
	}
})
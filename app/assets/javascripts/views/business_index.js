Greedly.Views.BusinessIndex = Backbone.CompositeView.extend({
	template: JST['bus_index'],
	
	initialize: function () {
		// this.listenTo(this.collection, 'sync', this.render);
		this.listenTo(this.collection, 'add', this.addBusiness);
		// this.listenTo(this.subcol, 'sync', this.render)
		var view = this;
		this.collection.each(function (business){
			view.addBusiness(business);
		});
	},
	
	
	
	render: function () {
		var that = this
		this.attachSubviews();
		this.$el.html(that.template());
		// this.$('.to-biz-show').on('click', this.businessShow.bind(this));
		return this;
	},
	
	addBusiness: function (business) {
		var view = new Greedly.Views.BusinessListItem({
			model: business,
			subcol: Greedly.subscriptions
		});
		this.addSubview('#businesses-wrapper', view);
	},

	renderBusinessListItems: function () {
		this.collection.each(this.addBusiness.bind(this));
	},
})
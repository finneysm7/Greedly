Greedly.Views.SearchShow = Backbone.CompositeView.extend({
	template: JST['search_show'],
	
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
		this.$el.html(that.template());
		this.attachSubviews();
		return this;
	},
	
	addBusiness: function (business) {
		var view = new Greedly.Views.BusinessListItem({
			model: business,
			subcol: Greedly.subscriptions
		});
		this.addSubview('#search-result', view);
	},

	renderBusinessListItems: function () {
		this.collection.each(this.addBusiness.bind(this));
	},
})
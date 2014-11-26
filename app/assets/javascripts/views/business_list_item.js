Greedly.Views.BusinessListItem = Backbone.View.extend({
	template: JST['bus_list_show'],
	
	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
	},
	
	render: function () {
		var renderedContent = this.template({
			business: this.model
		})
		this.$el.html(renderedContent);
		return this;
	}
})
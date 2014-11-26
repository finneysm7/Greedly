Greedly.Views.ArticleShow = Backbone.View.extend({
	template: JST['art_show'],
	
	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
	},
	
	render: function () {
		var renderedContent = this.template({
			article: this.model
		})
		this.$el.html(renderedContent);
		return this;
	}
})
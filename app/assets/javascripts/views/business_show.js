Greedly.Views.BusinessShow = Backbone.CompositeView.extend({
	template: JST['bus_show'],
	
	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
		//this.listenTo(this., 'add', this.addArticle);
		this.listenTo(this.model.articles(), 'add', this.renderArticles);
	},
	
	render: function () {
		var renderedContent = this.template({
			business: this.model
		})
		this.$el.html(renderedContent);
		this.renderArticles();
		return this;
	},
	
	addArticle: function (article) {
		debugger
		var view = new Greedly.Views.ArticleShow({
			model: article
		});
		this.addSubview('#article-wrapper', view);
	},
	
	renderArticles: function () {
		
		this.model.articles().each(this.addArticle.bind(this));
	}
})
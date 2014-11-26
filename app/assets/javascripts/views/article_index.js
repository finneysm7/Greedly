Greedly.Views.ArticleIndex = Backbone.CompositeView.extend({
	template: JST['art_index'],
	
	initialize: function () {
		// this.listenTo(this.collection, 'sync', this.render);
		this.listenTo(this.collection, 'add', this.addArticleItem);
		var view = this;
		this.collection.each(function (article){
			view.addArticleItem(article);
		});
	},
	
	render: function () {
		var that = this
		this.$el.html(that.template());
		this.attachSubviews();
		return this;
	},
	
	addArticleItem: function (article) {
		var view = new Greedly.Views.ArticleShow({
			model: article
		});
		this.addSubview('#article-list', view);
	}
})
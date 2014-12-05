Greedly.Views.BusinessShow = Backbone.CompositeView.extend({
	template: JST['bus_show'],
	
	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
		//this.listenTo(this., 'add', this.addArticle);
		// this.listenTo(this.model.articles(), 'add', this.renderArticles);
	},
	
	events: {
		'click .back-to-biz': 'slide',
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
		this.$('.spinner').remove();
		var view = new Greedly.Views.ArticleShow({
			model: article
		});
		this.addSubview('#article-wrapper', view);
	},
	
	renderArticles: function () {
		this.model.articles().each(this.addArticle.bind(this));
	},
	
	slide: function (event) {
		event.preventDefault();
		this.$el.parent().one('transitionend', function(event) {
			$(event.currentTarget).css("display", "none");
			// set style to display: none
		})
		this.$el.parent().removeClass('show');
		$('.disabling').removeClass('is_disabled'); 
	} 
})
Greedly.Models.Business = Backbone.Model.extend({
	urlRoot: '/api/businesses',
	
	articles: function () {
		if(!this._articles) {
			this._articles = new Greedly.Collections.Articles();
		}
		return this._articles;
	},
	
	firstArticle: function () {
		if (!this._firstArticle){
			this._firstArticle = new Greedly.Models.Article();
		}
		
		return this._firstArticle;
	},
	
	subscribeState: function () {
		if (!this._subscribeState){
			this._subscribeState = 'unsubscribed'
		}
		return this._subscribeState;
	},
	
	toggleSubscribeState: function () {
		if (this.subscribeState() === 'unsubscribed'){
			this._subscribeState = 'subscribing';
		} else if (this.subscribeState() === 'subscribed') {
			this._subscribeState = 'unsubscribing';
		} else if (this.subscribeState() === 'subscribing') {
			this._subscribeState = 'subscribed';
		} else if (this.subscribeState() === 'unsubscribing') {
			this._subscribeState = 'unsubscribed';
		}
		return this._subscribeState;
	},
	
	parse: function (response) {
		if (response.articles) {
			this.articles().set(response.articles);
			delete response.articles;
		} else if (response.first_article) {
			this.firstArticle().set(response.first_article);
			delete response.first_article;
		}
		
		return response;
	},
	
	imageUrl: function () {
		return 'assets/' + this.get('image_source')
	},
});
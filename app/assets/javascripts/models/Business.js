Greedly.Models.Business = Backbone.Model.extend({
	urlRoot: '/api/businesses',
	
	articles: function () {
		if(!this._articles) {
			this._articles = new Greedly.Collections.Articles();
		}
		return this._articles;
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
		if (response.latest_articles) {
			this.articles().set(response.latest_articles);
			delete response.latest_articles;
		}
		
		return response;
	}
});
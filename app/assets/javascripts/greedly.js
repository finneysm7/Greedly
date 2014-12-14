
initSearch = function(){
	$('#search-form').on('submit', function(event){
		event.preventDefault();
		// var thing = $(event.currentTarget).serialize();
		var thing = $(event.currentTarget).find('input').val();
		var thingEnc = encodeURIComponent(thing);
		Backbone.history.navigate('search/?business%3D' + thingEnc, {trigger: true});
	})
}

initGuestLogin = function(){
	$('#guest-login').on('click', function(event){
		var $target = $('#guest-login')
		event.preventDefault();
		if ($('#new-user').parent($target)){
			//redirect to session/new
		}
		$('#email-input input').val('guest');
		$('#password-input input').val('heyman');
		$('#submit-btn').trigger('click')
	})
}

$(initSearch)
$(initGuestLogin)

window.Greedly = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
	Greedly.businesses = new Greedly.Collections.Businesses();
	new Greedly.Routers.Router({
		$rootEl: $('#main'),
	});
	
	
	Greedly.articles = new Greedly.Collections.Articles();
	// Greedly.articles.fetch();
	Greedly.subscriptions = new Greedly.Collections.Subscriptions();
	Greedly.subscriptions.fetch();
	var subIndex = new Greedly.Views.SubIndex({
		collection: Greedly.subscriptions
	});
	$('#sidebar').html(subIndex.render().$el)
	Backbone.history.start();
  },
}

Backbone.CompositeView = Backbone.View.extend({
	addSubview: function (selector, subview) {
		this.subviews(selector).push(subview);
		this.attachSubview(selector, subview.render());
	},
	
	attachSubview: function (selector, subview){
		this.$(selector).append(subview.$el);
		
		subview.delegateEvents();
		
		if (subview.attachSubviews) {
			subview.attachSubviews();
		}
	},
	
	attachSubviews: function () {
		var view = this;
		_(this.subviews()).each(function (subviews, selector){
			view.$(selector).empty();
			_(subviews).each(function (subview){
				view.attachSubview(selector, subview);
			});
		});
	},
	
	removeSubview: function (selector, subview) {
		subview.remove();
		
		var subviews = this.subviews(selector);
		subviews.splice(subviews.indexOf(subview), 1);
	},
	
	subviews: function (selector) {
		this._subviews = this._subviews || {};
		
		if (!selector) {
			return this._subviews;
		} else {
			this._subviews[selector] = this._subviews[selector] || [];
			return this._subviews[selector];
		}
	}
});
// # $(document).ready
// #   Greedly.initialize()

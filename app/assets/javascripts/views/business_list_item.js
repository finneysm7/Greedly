Greedly.Views.BusinessListItem = Backbone.View.extend({
	tagname: 'li',
	
	template: JST['bus_list_show'],
	
	initialize: function (options) {
		this.subcol = options.subcol;
		this.listenTo(this.model, 'change sync', function () {
			this.render();
			this.setUpSubscribeToggle();
		}.bind(this));
		this.listenTo(this.subcol, 'sync add', this.setUpSubscribeToggle);
		this.listenTo(this.subcol, 'remove reset', this.render);
		this.setUpSubscribeToggle();
	},
	
	events: {
		'click button': 'subscribeToggle',
		//listen for click of business show trigger
		'click .to-biz-show': 'businessShow'
	},

	render: function () {
		var disability = false;
		var biz_val = "";
		if (this.model.subscribeState() == "subscribed") {
		    disability = false;
		    biz_val = "Unsubscribe";
		  } else if (this.model.subscribeState() == "unsubscribed") {
  		    disability = false;
  		    biz_val = "Subscribe";
		  } else if (this.model.subscribeState() == "subscribing") {
		    disability = true;
		    biz_val = "Subscribing...";
			this.model.toggleSubscribeState();
		  } else if (this.model.subscribeState() == "unsubscribing") {
  		    disability = true;
  		    biz_val = "Unsubscribing...";
			this.model.toggleSubscribeState();
		  }
		  var that = this;
		  // this.model.firstArticle().fetch({
//  			  success: function () {
//  		  		var renderedContent = that.template({
//  		  			business: that.model,
//  		  			disabled: disability,
//  		  			button_val: biz_val,
//  		  			article: that.model.firstArticle()
//  		  		})
//  		  		that.$el.html(renderedContent);
//  		  		return that;
//  			  }
//  		  });
 		var renderedContent = that.template({
  		  			business: that.model,
  		  			disabled: disability,
  		  			button_val: biz_val,
					article: that.model.firstArticle()
  		  		})
 		 this.$el.html(renderedContent);
		  return this;
	},
	
	setUpSubscribeToggle: function () {
		this.businessId = this.model.id;
		this.subcol.each(function (sub) {
			if (this.model.id === sub.get('business_id')){
				this.model._subscribeState = 'subscribed'	
			};
		}.bind(this));
		this.render();
	},
	
	subscribeToggle: function (event) {
		event.preventDefault();
		var button = event.currentTarget;
		
		if (this.model.subscribeState() === 'subscribed') {
			this.model.toggleSubscribeState();
			this.render();
			
			var that = this;
			var subscription = this.subcol.findWhere({
				business_id: this.model.id
			});
			subscription.destroy({
				success: function() {
					that.subscribeState = 'unsubscribed';
					that.subcol.remove(subscription);
					that.render();
				}
			});
			
		} else if (this.model.subscribeState() === 'unsubscribed'){
			this.model.toggleSubscribeState();
			this.render();
			
			var that = this;
			var subscription = new Greedly.Models.Subscription({
				'business_id': that.model.id
			});
			this.subcol.create(subscription, {
				success: function() {
					that.subscribeState = 'subscribed';
					that.render();
				}
			});
		}
	},
	
	businessShow: function (event) {
		event.preventDefault();
		var id = $(event.currentTarget).data('id')
		var model = Greedly.businesses.getOrFetch(id);
		var busShow = new Greedly.Views.BusinessShow({
			model: model
		});
		$('#biz-show').css('display', '');
		setTimeout(function () {
			$('#biz-show').html(busShow.render().$el);
			$('#biz-show').addClass('show');
			$('.disabling').addClass('is_disabled');
			// $('.backdrop').addClass('back-to-biz')
		}, 50);
	}
})
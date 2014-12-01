Greedly.Views.BusinessListItem = Backbone.View.extend({
	tagname: 'li',
	template: JST['bus_list_show'],
	
	initialize: function () {
		this.listenTo(this.subcol, 'sync', this.setUpSubscribeToggle);
		this.listenTo(this.model, 'sync', this.render);
	},
	
	events: {
		'click button': 'subscribeToggle'
	},

	render: function () {
		var disability = false;
		var biz_val = "Subscribe";
		if (this.subscribeState == "subscribed") {
		    disability = false;
		    biz_val = "Unsubscribe";
		  } else if (this.subscribeState == "unsubscribed") {
  		    disability = false;
  		    biz_val = "Subscribe";
		  } else if (this.subscribeState == "subscribing") {
		    disability = true;
		    biz_val = "Subscribing...";
		  } else if (this.subscribeState == "unsubscribing") {
  		    disability = true;
  		    biz_val = "Unsubscribing...";
		  }
		var renderedContent = this.template({
			business: this.model,
			disabled: disability,
			button_val: biz_val
		})
		this.$el.html(renderedContent);
		return this;
	},
	
	setUpSubscribeToggle: function () {
		this.businessId = this.model.id;
		this.subcol.each(function (sub) {
			if (this.model.get(sub.get('business_id'))){
				this.subscribeState = 'subscribed'
			} else {
				this.subscribeState = 'unsubscribed'
			};
		}.bind(this));
		this.render();
	},
	
	subscribeToggle: function (event) {
		event.preventDefault();
		var button = event.currentTarget;
		
		if (this.subscribeState === 'subscribed') {
			this.subscribeState = 'subscribing';
			this.render();
			
			
			
		} else if (this.subscribeState === 'unsubscribed'){
			this.subscribeState = 'unsubscribing';
			this.render();
		}
	}
})
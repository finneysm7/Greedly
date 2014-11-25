window.Greedly = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
		Greedly.businesses = new Greedly.Collections.Businesses();
		new Greedly.Routers.Router({
			$rootEl: $('#main')
		});
		Backbone.history.start();
		
  },
}
// # $(document).ready
// #   Greedly.initialize()

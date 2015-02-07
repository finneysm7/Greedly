This is an RSS reader that is based off of the popular site Feedly. The live version of Greedly
can be viewed [here](http://www.greedly.net).

This website was made using Backbone.js as a front end consuming a rails api.

Some of the challenges that I came accross in this project involved elimintating n+1 queries while serving up to first article for each feed on the feeds index. This involved writing my own specific code which can be seen in the business model [here](app/models/business.rb).

In addition to this backend problem, I have made my own custom CSS transitions using javascript set timeout functions and CSS transitions in order to get the business show page to slide in from the side. This code can be viewed [here](app/assets/javascripts/views/business_show.js). The setTimout for the slide function can be found [here](app/assets/javascripts/views/business_list_item.js).

Finally, I also have a custom search endpoint in the Backend router which uses a RegEx to scan through a user's collection of feeds. This search function can be viewed [here](app/assets/javascripts/collections/Businesses.js).
var dbox_utility = function()
{
	var dbox;
	var app;
	var key = "8higzkomex2c5jy";
	var secret = "rueapgelizhsyb1";

	var init_dbox = function() {
		dbox = require("dbox");
		app = dbox.app( {"app_key" : key, "app_secret" : secret} );

		app.requesttoken(function(status, request_token) {
			console.log(request_token);
			console.log("Must visit: https://www.dropbox.com/1/oauth/authorize?oauth_token=#"+request_token.oauth_token);
		});
	}

	return {
		init: init_dbox,

	}
}
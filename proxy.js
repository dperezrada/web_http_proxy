var request = require('request'),
	url = require('url');

exports.parse = function(req,res) {
	if (req.originalUrl.indexOf('/reset_url') === 0) {
		console.log("refreshing");
		req.session.proxy_url = null;
		res.send("OK");
	}else{
		different_than_proxy_url = req.session.proxy_url != req.originalUrl.substr(1);
		if (req.session.proxy_url && different_than_proxy_url) {
			destination_url = url.resolve(req.session.proxy_url, req.originalUrl);
			request.get({url: destination_url, encoding: null}, function(err, ext_response, body){
				var content_type = ext_response.headers["content-type"];
				res.setHeader('Content-Type',content_type);
				res.send(body);
			});
		} else {
			if (req.originalUrl !== "") {
				base_url = req.originalUrl.substr(1); //Removing inital /
				if(base_url.indexOf('http') !== 0){
					base_url = "http://"+base_url;
				}
				req.session.proxy_url = base_url;
				request.get({url: req.session.proxy_url}, function(err, ext_response, body){
					modified_body = body.replace('<head>', '<head><script>alert("hola")</script>');
					res.send(modified_body);
				});
			}
		}
	}
};
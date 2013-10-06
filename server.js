// Builtin packages
var http = require('http');
var url = require('url');

// Express
var express = require('express')
  , http = require('http')
  , dbox = require('dbox')
  , path = require('path');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

//--------------------------------------------------------------------------------------------
var app = express();
var app_root = "sandbox";

app.configure(function(){
  app.set('port', process.env.PORT || 9001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('d9nEPGiAeSwGFUN2Ra8CGBmq'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb:hack:hack,hack.kalosal.com/test');
var db = mongoose.connection;
db.once('open', function callback () {
    console.log("hooray!");
    var UserSchema = new Schema({
    	username: String,
    	password: String,
    	documents: {}
    })
    app.User = User = mongoose.model('User', UserSchema);
    var jordan = new User({
    	username: "stevenz",
    	password: "derpderp",
    	documents: {}
    });
    /*jordan.save(function(error, data) {
        if(error) {
        	console.log(error);
        } else {
        	console.log(data);
        }
    }); */
    User.remove();
    console.log(User);
    User.find(function(err, people) {
    	if(err) {
    		console.log(error);
    	} else {
    		console.log(people);
    	}
    })
    
});

app.set('port', process.env.PORT || 3001);
app.use(express.favicon());
app.use(express.bodyParser());
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.methodOverride());


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
    	console.log(user);
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(password === user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//Check port
var port = process.env.PORT || 3001;
app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

function start(route) {
	app.use(express.static(__dirname + '/Public'));
	app.get('/', function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log('Request for ' + pathname + ' received.');
        route(pathname);
        response.sendfile('Public/testPage.html')
		//response.end();
	});

	app.get('/parse', function(request, response) {
    var pathname = url.parse(request.url).pathname;

    


    console.log("Request for " + pathname + " received.");
        route(pathname);
        response.sendfile('Public/MarkdownParse.html')
    //response.end();
  });

    app.post('/dropbox/init', function(request, response) {
        var key = "kbetzb9w42keiiq";
        var secret = "betdjmiwex34w99";
        var dbox = require("dbox");
        var app = dbox.app({ 
            "app_key": key, 
            "app_secret": secret,
            "root": app_root
        });

        app.requesttoken(function(status, request_token) {

            if (status === 200)
            {
                request.session.request_token = request_token;
                request.session.app_info = {
                    app_key: key,
                    app_secret: secret,
                    root: app_root
                }
            }
            //console.log(request_token);
            response.send({status: status, url: "https://www.dropbox.com/1/oauth/authorize?oauth_token=" + request_token.oauth_token});
        });
    });

    app.post('/dropbox/confirm', function(request, response) {
        //must have already had user authenticate
        if (request.session.app_info != null)
        {
            var app = createApp(request.session);

            app.accesstoken(request.session.request_token, function(status, access_token) {
                if (status == 200) request.session.access_token = access_token;
                response.send({status: status, access_token: access_token});
            });
        }
    });

    app.post("/dropbox/create", function(request, response) {
        var app = createApp(request.session);
        var client = app.client(request.session.access_token);
        client.put("/test.txt", "here is some data", function(status, reply) {
            console.log(reply);
        });
         client.account(function(status, reply){
            response.send("Test!");
            console.log(reply);
         });
    });

    app.get("/dropbox/list", function(req, res) {
        var app = createApp(req.session);
        var client = app.client(req.session.access_token);
        client.readdir("/", function(status, reply) {
          res.send(reply);
        });
    });

	app.get('/login', function(request, response) {
		response.sendfile('Public/testPage.html');
		console.log("!!!!!!");
	})

    app.post('/login',
        passport.authenticate('local', { successRedirect: '/loginsuccess',
                                   failureRedirect: '/loginfail',
                                   failureFlash: false })
    );

	app.listen(9001);
	console.log('Server has started.');
}

exports.start = start;
exports.app = app;

function createApp(session)
{
  if (session.app_info != null)
  {
    return dbox.app({
      "app_key": session.app_info.app_key,
      "app_secret": session.app_info.app_secret,
      "root": app_root
    });
  }
}

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var twitter = require('ntwitter');
var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');
var flash = require('connect-flash');

var app = express();

// all environments
app.set('port', process.env.PORT || 8888);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
    secret: settings.cookieSecret,
    key: settings.db, //cookie name
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    },
    store: new MongoStore({
        db: settings.db
    })
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var twit = new twitter({
  consumer_key: '8z9fF80g0s8L3CW5UtNhQ',
  consumer_secret: 'hyTFC5DhCPfcRkF4tMxGh0HL6hPJRkXQDJoeBxQQI',
  access_token_key: '1627166834-K0H5S5EzawYyS0zJpfro77dml22qTbw4dme1QCM',
  access_token_secret: 'FqmMdqJEqsfgS3IAI5fUTG4if5leEUjuGYT3souLxJFEb'
});

var happy = {
    num: 0,
    percentage: 0,
    user: '',
    tweet: '',
    avatar: ''
}, excited = {
    num: 0,
    percentage: 0,
    user: '',
    tweet: '',
    avatar: ''
}, sad = {
    num: 0,
    percentage: 0,
    user: '',
    tweet: '',
    avatar: ''
}, mad = {
    num: 0,
    percentage: 0,
    user: '',
    tweet: '',
    avatar: ''
}, jealous = {
    num: 0,
    percentage: 0,
    user: '',
    tweet: '',
    avatar: ''
}, upset = {
    num: 0,
    percentage: 0,
    user: '',
    tweet: '',
    avatar: ''
}, comfort = {
    num: 0,
    percentage: 0,
    user: '',
    tweet: '',
    avatar: ''
}, fear = {
    num: 0,
    percentage: 0,
    user: '',
    tweet: '',
    avatar: ''
}, surprised = {
    num: 0,
    percentage: 0,
    user: '',
    tweet: '',
    avatar: ''
},total=0;
setInterval(function() {
    happy.num = 0;
    excited.num = 0;
    sad.num = 0;
    mad.num = 0;
    jealous.num = 0;
    upset.num = 0;
    comfort.num = 0;
    fear.num = 0;
    surprised.num = 0;
    total = 0;
},60000);
twit.stream('statuses/filter', { track: ["I'm happy","I am happy","I feel happy","I'm pleased","I am pleased","I feel pleased","I'm cheerful","I am cheerful","I feel cheerful","I'm delighted","I am delighted","I feel delighted","makes me happy","I am laughing","I'm laughing",
"I'm excited","I am excited","I feel excited","I am energetic","I'm energetic","I feel energetic","I am passionate","I'm passionate","I feel passionate","I am hysterical","I'm hysterical","I feel hysterical",
"I'm sad","I am sad","I feel sad","I am crying","I'm crying","I am heartbroken","I'm heartbroken","I feel heartbroken","I'm despaired","I am despaired","I feel despaired",
"I'm mad","I am mad","I feel mad","I am angry","I'm angry","I feel angry","I am raged","I'm raged","I feel raged","I am annoyed","I'm annoyed","I feel annoyed","I am indignant","I'm indignant","I feel indignant",
"I'm jealous","I am jealous","I feel jealous","I envy","with envy",
"I feel upset","I'm upset","I am upset","I feel frustrated","I'm frustrated","I am frustrated","I feel gloomy","I'm gloomy","I am gloomy","I feel depressed","I'm depressed","I am depressed","I'm discouraged","I am discouraged","I feel discouraged",
"I feel comfortable","I'm comfortable","I am comfortable","I feel relaxed","I'm relaxed","I am relaxed","I feel satisfied","I'm satisfied","I am satisfied","I feel relieved","I'm relieved","I am relieved",
"I feel scared","I am scared","I'm scared","I feel terrified","I am terrified","I'm terrified","I feel panicked","I am panicked","I'm panicked","I feel chilling","I am chilling","I'm chilling",
"I feel surprised","I'm surprised","I am surprised","I feel shocked","I'm shocked","I am shocked","I feel amazed","I am amazed","I'm amazed","I am stunned","I'm stunned","I feel stunned"] }, function(stream) {
stream.on('data', function (data) {
    if (data.text) { 
      var text = data.text;
      console.log(data);
      if ((text.indexOf("I'm happy") != -1)||(text.indexOf("I am happy") != -1)||(text.indexOf("I feel happy") != -1)||
        (text.indexOf("I'm pleased") != -1)||(text.indexOf("I am pleased") != -1)||
        (text.indexOf("I feel pleased") != -1)||(text.indexOf("I'm cheerful") != -1)||
        (text.indexOf("I am cheerful") != -1)||(text.indexOf("I feel cheerful") != -1)||
        (text.indexOf("I'm delighted") != -1)||(text.indexOf("I am delighted") != -1)||
        (text.indexOf("I feel delighted") != -1)||(text.indexOf("I'm laughing") != -1)||
        (text.indexOf("I am laughing") != -1)) {
        happy.num++;
        total++;
        happy.percentage = (happy.num/total)*100;
        happy.user = data.user.screen_name;
        happy.tweet = data.text;
        happy.avatar = data.user.profile_image_url_https;
      }
      if ((text.indexOf("I'm excited") != -1)||(text.indexOf("I am excited") != -1)||
        (text.indexOf("I feel excited") != -1)||(text.indexOf("I am energetic") != -1)||
        (text.indexOf("I'm energetic") != -1)||(text.indexOf("I feel energetic") != -1)||
        (text.indexOf("I am passionate") != -1)||(text.indexOf("I'm passionate") != -1)||
        (text.indexOf("I feel hysterical") != -1)||(text.indexOf("I feel passionate") != -1)||
        (text.indexOf("I am hysterical") != -1)||(text.indexOf("I'm hysterical") != -1)) {
        excited.num++;
        total++;
        excited.percentage = (excited.num/total)*100;
        excited.user = data.user.screen_name;
        excited.tweet = data.text;
        excited.avatar = data.user.profile_image_url_https;
      }
      if ((text.indexOf("I'm sad") != -1)||(text.indexOf("I am sad") != -1)||
        (text.indexOf("I feel sad") != -1)||(text.indexOf("I am crying") != -1)||
        (text.indexOf("I'm crying") != -1)||(text.indexOf("I am heartbroken") != -1)||
        (text.indexOf("I'm heartbroken") != -1)||(text.indexOf("I feel heartbroken") != -1)||
        (text.indexOf("I'm despaired") != -1)||(text.indexOf("I am despaired") != -1)||
        (text.indexOf("I feel despaired") != -1)) {
        sad.num++;
        total++;
        sad.percentage = (sad.num/total)*100;
        sad.user = data.user.screen_name;
        sad.tweet = data.text;
        sad.avatar = data.user.profile_image_url_https;
      }
      if ((text.indexOf("I'm mad") != -1)||(text.indexOf("I am mad") != -1)||
        (text.indexOf("I feel mad") != -1)||(text.indexOf("I am angry") != -1)||
        (text.indexOf("I'm angry") != -1)||(text.indexOf("I feel angry") != -1)||
        (text.indexOf("I am raged") != -1)||(text.indexOf("I'm raged") != -1)||
        (text.indexOf("I feel raged") != -1)||(text.indexOf("I am annoyed") != -1)||
        (text.indexOf("I'm annoyed") != -1)||(text.indexOf("I feel annoyed") != -1)||
        (text.indexOf("I'm indignant") != -1)||(text.indexOf("I feel indignant") != -1)||
        (text.indexOf("I am indignant") != -1)) {
        mad.num++;
        total++;
        mad.percentage = (mad.num/total)*100;
        mad.user = data.user.screen_name;
        mad.tweet = data.text;
        mad.avatar = data.user.profile_image_url_https;
      }
      if ((text.indexOf("I'm jealous") != -1)||(text.indexOf("I am jealous") != -1)||
        (text.indexOf("I feel jealous") != -1)||(text.indexOf("I envy") != -1)||
        (text.indexOf("I'm envious") != -1)||(text.indexOf("I am envious") != -1)||
        (text.indexOf("I feel envious") != -1)||(text.indexOf("with envy") != -1)) {
        jealous.num++;
        total++;
        jealous.percentage = (jealous.num/total)*100;
        jealous.user = data.user.screen_name;
        jealous.tweet = data.text;
        jealous.avatar = data.user.profile_image_url_https;
      }
      if ((text.indexOf("I feel upset") != -1)||(text.indexOf("I'm upset") != -1)||
        (text.indexOf("I am upset") != -1)||(text.indexOf("I feel frustrated") != -1)||
        (text.indexOf("I'm frustrated") != -1)||(text.indexOf("I am frustrated") != -1)||
        (text.indexOf("I feel gloomy") != -1)||(text.indexOf("I'm gloomy") != -1)||
        (text.indexOf("I am gloomy") != -1)||(text.indexOf("I feel depressed") != -1)||
        (text.indexOf("I'm depressed") != -1)||(text.indexOf("I am depressed") != -1)||
        (text.indexOf("I'm discouraged") != -1)||(text.indexOf("I am discouraged") != -1)||
        (text.indexOf("I feel discouraged") != -1)) {
        upset.num++;
        total++;
        upset.percentage = (upset.num/total)*100;
        upset.user = data.user.screen_name;
        upset.tweet = data.text;
        upset.avatar = data.user.profile_image_url_https;
      }
      if ((text.indexOf("I feel comfortable") != -1)||(text.indexOf("I'm comfortable") != -1)||
        (text.indexOf("I am comfortable") != -1)||(text.indexOf("I feel relaxed") != -1)||
        (text.indexOf("I'm relaxed") != -1)||(text.indexOf("I am relaxed") != -1)||
        (text.indexOf("I feel satisfied") != -1)||(text.indexOf("I'm satisfied") != -1)||
        (text.indexOf("I am satisfied") != -1)||(text.indexOf("I feel relieved") != -1)||
        (text.indexOf("I'm relieved") != -1)||(text.indexOf("I am relieved") != -1)) {
        comfort.num++;
        total++;
        comfort.percentage = (comfort.num/total)*100;
        comfort.user = data.user.screen_name;
        comfort.tweet = data.text;
        comfort.avatar = data.user.profile_image_url_https;
      }
      if ((text.indexOf("I feel scared") != -1)||(text.indexOf("I am scared") != -1)||
        (text.indexOf("I'm scared") != -1)||(text.indexOf("I feel terrified") != -1)||
        (text.indexOf("I am terrified") != -1)||(text.indexOf("I'm terrified") != -1)||
        (text.indexOf("I feel panicked") != -1)||(text.indexOf("I am panicked") != -1)||
        (text.indexOf("I'm panicked") != -1)||(text.indexOf("I feel chilling") != -1)||
        (text.indexOf("I am chilling") != -1)||(text.indexOf("I'm chilling") != -1)) {
        fear.num++;
        total++;
        fear.percentage = (fear.num/total)*100;
        fear.user = data.user.screen_name;
        fear.tweet = data.text;
        fear.avatar = data.user.profile_image_url_https;
      }
      if ((text.indexOf("I feel surprised") != -1)||(text.indexOf("I'm surprised") != -1)||
        (text.indexOf("I am surprised") != -1)||(text.indexOf("I feel shocked") != -1)||
        (text.indexOf("I'm shocked") != -1)||(text.indexOf("I am shocked") != -1)||
        (text.indexOf("I feel amazed") != -1)||(text.indexOf("I am amazed") != -1)||
        (text.indexOf("I'm amazed") != -1)||(text.indexOf("I feel stunned") != -1)||
        (text.indexOf("I am stunned") != -1)||(text.indexOf("I'm stunned") != -1)) {
        surprised.num++;
        total++;
        surprised.percentage = (surprised.num/total)*100;
        surprised.user = data.user.screen_name;
        surprised.tweet = data.text;
        surprised.avatar = data.user.profile_image_url_https;
      }
    }
  });
});

var server = http.createServer(app);
var io = require('socket.io').listen(server);
global.mood = 'happy';
global.red = 125, global.green = 125, global.blue = 125;
io.sockets.on('connection', function(socket) {
    setInterval(function() { 
      socket.emit('percentages', { 
        happy: happy,
        excited: excited,
        sad: sad,
        mad: mad,
        jealous: jealous,
        upset: upset,
        comfort: comfort,
        fear: fear,
        surprised: surprised
      });
      mood = Math.max(happy.percentage, excited.percentage, sad.percentage, mad.percentage, jealous.percentage, upset.percentage,
    comfort.percentage, fear.percentage, surprised.percentage);
      switch (mood) {
            case happy.percentage:
            mood = 'happy';
            break;
            case excited.percentage:
            mood = 'excited';
            break;
            case sad.percentage:
            mood = 'sad';
            break;
            case mad.percentage:
            mood = 'mad';
            break;
            case jealous.percentage:
            mood = 'jealous';
            break;
            case upset.percentage:
            mood = 'upset';
            break;
            case comfort.percentage:
            mood = 'comfort';
            break;
            case fear.percentage:
            mood = 'fear';
            break;
            case surprised.percentage:
            mood = 'surprised';
            break;
            default:
            mood = 'happy';
        }
        console.log('mood', mood);
    }, 3000); 

    socket.on('set-tone-color', function (data) {
        if(data) {
            global.red = data.red;
            global.green = data.green;
            global.blue = data.blue;
        }
    });

});

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});


routes(app);
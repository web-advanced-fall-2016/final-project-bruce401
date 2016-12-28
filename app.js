var express = require('express');
var app = express();
var port = 8000;

//set up handlebars to allow app to view dynamic html
var hbs = require('hbs');

var blogEngine = require('./blog');

app.set('view engine', 'html');
app.engine('html', hbs.__express);
//"view engine" directive -- tells express to treat html files as dynamic
app.use(express.bodyParser());

app.use(express.static('public'));
//set up routes

//get homepage rendered
app.get('/', function(req, res) {
  res.render('index', {title:"My Blog", entries:blogEngine.getBlogEntries()});
});

//get new page going
app.get('/article/new', function(req, res){
  console.log('write a new article');
  res.render('new');
});

//view an article
app.get('/article/:id', function(req, res){
  var entry = blogEngine.getBlogEntry(req.params.id);
  res.render('article', {title:entry.title, blog:entry});
});

//set up server
app.listen(port);
console.log('Going down on port ' + port);

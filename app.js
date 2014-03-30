
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path')
  
var app = module.exports = express()


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.methodOverride())

if (app.get('env') === 'development') {

	app.use(express.static(path.join(__dirname, 'public')))
	app.set('views', __dirname + '/views')
} 
else if (app.get('env') == 'production') {

	app.use(express.static(path.join(__dirname, 'build')))
	app.set('views', __dirname + '/build')
}

app.use(app.router)

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler())
}

// production only
if (app.get('env') === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index)
app.get('/partials/:name', routes.partials)

// JSON API
app.post('/api/getTerms/:type', api.getTerms)
app.post('/api/getReportList', api.getReportList)
app.post('/api/getTemplate', api.getTemplate)

// redirect all others to the index (HTML5 history)
app.get('*', routes.index)


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'))
})

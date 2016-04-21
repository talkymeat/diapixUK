var express = require('express');
var app = express();
var http = require('http');
var pg = require('pg');
pg.defaults.ssl = true;
var port = process.env.PORT || 9000
var conString = process.env.DATABASE_URL;
var pg_client = new pg.Client(conString);
pg_client.connect();
var query = pg_client.query('LISTEN addedrecord');

app.use(express.static('www'));

// views is directory for all template files
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    next()
});

var server = http.createServer(app);

var server2 = http.createServer(function(req, res) {

  // get a pg client from the connection pool
  pg.connect(conString, function(err, client, done) {

    var handleError = function(err) {
      // no error occurred, continue with the request
      if(!err) return false;

      // An error occurred, remove the client from the connection pool.
      // A truthy value passed to done will remove the connection from the pool
      // instead of simply returning it to be reused.
      // In this case, if we have successfully received a client (truthy)
      // then it will be removed from the pool.
      if(client){
        done(client);
      }
      res.writeHead(500, {'content-type': 'text/plain'});
      res.end('An error occurred');
      return true;
    };

    // handle an error from the connection
    if(handleError(err)) return;

    // record the visit
    client.query('INSERT INTO visit (date) VALUES ($1)', [new Date()], function(err, result) {

      // handle an error from the query
      if(handleError(err)) return;

      // get the total number of visits today (including the current visit)
      client.query('SELECT COUNT(date) AS count FROM visit', function(err, result) {

        // handle an error from the query
        if(handleError(err)) return;

        // return the client to the connection pool for other requests to reuse
        done();
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('You are visitor number ' + result.rows[0].count);
      });
    });
  });
})

var io = require('socket.io').listen(server);
server.listen(port);
console.log("http server listening on %d", port);

io.sockets.on('connection', function (socket) {
    socket.emit('connected', { connected: true });
    socket.broadcast.emit('user connected');
    // console.log('a user connected');

    socket.on('ready for data', function (data) {
        console.log(data);

        pg_client.on('notification', function(title) {
            console.log(title);
            socket.emit('update', { message: title });
        });
    });
});


app.get('/db', function (request, response) {
  pg.connect(conString, function(err, client, done) {
    client.query('SELECT * FROM visit', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
})

// server2.listen(3001)

//
// var wss = new WebSocketServer({server: server})
// console.log("websocket server created")
//
// wss.on("connection", function(ws) {
//   var id = setInterval(function() {
//     ws.send(JSON.stringify(new Date()), function() {  })
// }, 1000)
//
//   console.log("websocket connection open")
//
//   ws.on("close", function() {
//     console.log("websocket connection close")
//     clearInterval(id)
//   })
// })

// app.get('/', function(request, response) {
//   response.render('pages/index')
// });
// app.get('/', function(request, response) {
//   var result = ''
//   var times = process.env.TIMES || 5
//   for (i=0; i < times; i++)
//     result += cool();
//   response.send(result);
// });

// app.get('/cool', function(request, response) {
//   response.send(cool());
// });

// app.get('/db', function (request, response) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query('SELECT * FROM test_table', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('pages/db', {results: result.rows} ); }
//     });
//   });
// })

// app.listen(app.get('port'), function() {
//   console.log('Express server listening on port ', app.get('port'));
// });

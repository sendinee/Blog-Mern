let express = require('express'),
  app = express(),
  http = require('http').createServer(app),  // build http server on top of the express one
  io = require('socket.io')(http),
  port = process.env.PORT || 3030,
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser');
 
//add socket to middleware
app.use((req, res, next)=>{
  res.locals.io= io;
  next();
  return;
});

io.on('connection', function (socket) {
  console.log("new user connect")
});

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://ZOZO_coporation:kimtaehyung@cluster0.qcxy4.mongodb.net/blog?retryWrites=true&w=majority',
                {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Authentification
const auth = require("./services/AuthService");
app.use(auth.service);

let auth_routes = require('./api/routes/AuthRoutes'); //importing route
auth_routes(app); //register the route

let category_routes = require('./api/routes/CategoryRoutes'); //importing route
category_routes(app); //register the route

let post_routes = require('./api/routes/PostRoutes'); //importing route
post_routes(app); //register the route

http.listen(port);
console.log("API is listening on port: "+port);

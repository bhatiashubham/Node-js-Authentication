const express = require("express");
const app = express();
const port = 8000;

var bodyParser = require('body-parser')
let db = require('./config/mongoose.js')
let cookieParser = require('cookie-parser');
let session = require('express-session');
const passport  = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportgoogle = require("./config/passport-google-strategy.js");
const passportJWT = require('./config/node-jwt-strategy.js');
let Mongoosestore = require('connect-mongo');
const flash = require('connect-flash');
const custoMwire = require('./config/middolewire');


const chatServer = require('http').Server(app);
const chatSockets = require('./config/chatSocket.js').chatSockets(chatServer);
chatServer.listen(5001);
console.log('chat server is running on 5000');

const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static('./assets'));


app.set('view engine', 'ejs');
app.set('views', './views');



app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: "supersecret" ,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}))


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(flash());
app.use(custoMwire.setFlash);

app.use("/", require('./router'));

app.listen(port ,(err) =>{
    if(err){
        console.log("err in create server", err);
    }

    console.log("server is running in port", port);
});
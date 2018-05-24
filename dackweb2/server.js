var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var path = require('path')
var app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'controller')));
app.set('trust proxy', 1) // trust first proxy
app.use(session({ secret: 's e s s i o n', cookie: { maxAge: 24 * 60 * 60 * 1000 }}))

var loginRoute = require('./routes/login')
var userRoute = require('./routes/user')

app.use('/', loginRoute)
app.use('/user', userRoute)

var port = 3000
app.listen(port, ()=>{
    console.log('Server is running port ' + port)
})


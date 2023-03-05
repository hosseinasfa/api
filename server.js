require('app-module-path').addPath(__dirname);
const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
global.config = require('./modules/config');


//Connect to DB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/api');
mongoose.Promise = global.Promise;



app.use(bodyParser.json({ type : 'application/json'}));
app.use(bodyParser.urlencoded({ extended : true }));


const apiRouter = require('./modules/routes/api');
const webRouter = require('./modules/routes/web');

app.use('/api' , apiRouter);
app.use('/' , webRouter);

app.listen(config.port , () => {
    console.log(`server running at port ${config.port}...`)
});


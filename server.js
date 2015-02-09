    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request ??

  //======================================
    //app.listen(8080);
    console.log("App listening on port 8080");
    //modulus port
    app.listen(process.env.PORT)


    mongoose.connect('mongodb://shakrah:1onelove@novus.modulusmongo.net:27017/tyh5eSev',{},function(err){
        if (err != null) {
            console.error('failed to connect to db', err);
        } else {
            main();

        }
    });
    // routes ======================================================================
    function main() {
        // This function will be called once a database connection
        // has been established.
        // define model =================
        var eventSchema = new mongoose.Schema({
           title : {type: String},
           address : String,
           time: String,
           date : String,
           endDate : String,
           endTime : String
       });

        var Event = mongoose.model('Event', eventSchema);

        // api ---------------------------------------------------------------------
        app.get('/api/events', function(req, res) {
            Event.find(function(err, events) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err != null) {
                    res.send(err);
                } else {
                    res.json(events);
                }
            });
        });

        app.post('/api/events', function(req, res) {
            console.log('req.body:', req.body);
            // create a todo, information comes from AJAX request from Angular
            Event.create({
                title : req.body.title,
                address : req.body.address,
                date : req.body.date,
                endDate : req.body.endDate,
                time : req.body.time,
                endTime : req.body.endTime,
                done : false
            }, function(err, event) {
                if (err)
                    res.send(err);
                // get and return all the todos after you create another
                Event.find(function(err, events) {
                    if (err)
                        res.send(err)
                    res.json(events);
                });
            });
        });

        app.delete('/api/events/:event_id', function(req, res) {
            Event.remove({
                _id : req.params.event_id
            }, function(err, event) {
                if (err)
                    res.send(err);

                Event.find(function(err, events) {
                    if (err)
                        res.send(err)
                    res.json(events);
                });
            });
        });
        //----------------------UPDATE MODEL
          //date : String,
          //endDate : String,
          //endTime : String


        // application -------------------------------------------------------------
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load the single view file
        });
} //Closes main

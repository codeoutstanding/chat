/**
 * Created by gen on 2016-10-30.
 */
// Babel ES6/JSX Compiler
require('babel-register');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var async = require('async');
var colors = require('colors');
var mongoose = require('mongoose');
var request = require('request');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var swig  = require('swig');
var xml2js = require('xml2js');
var _ = require('underscore');

var config = require('./config');
var routes = require('./app/routes');
var Employee = require('./models/employee');

var app = express();

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * GET /api/characters
 * Returns 2 random characters of the same gender that have not been voted yet.
 */
app.get('/api/employees', function(req, res, next) {
    Employee.find()
        .limit(20)
        .exec(function(err, employees) {
            if (err) return next(err);

            if (employees.length > 0) {
                return res.send(employees);
            }
        });
});


/**
 * GET /api/characters/:id
 * Returns detailed character information.
 */
app.get('/api/employees/:id', function(req, res, next) {
    var id = req.params.id;
    Employee.findOne({ employeeId: id }, function(err, employee) {
        if (err) return next(err);

        if (!employee) {
            return res.status(404).send({ message: 'Employee not found.' });
        }

        res.send(employee);
    });
});

/**
 * POST /api/characters
 * Adds new character to the database.
 */
app.post('/api/employees', function(req, res, next) {
    var employeeDescription = req.body.description;
    var employeeName = req.body.name;
    var employeeIcon = req.body.icon;

    async.waterfall([function (callback) {
        try {
            Employee.findOne({employeeName: employeeName}, function (error, employee) {
                if (error) return next(error);
                if (employee) {
                    return res.status(409).send({
                        message: employee.employeeName + ' is already in the database.'
                    });
                }
                callback(error, employeeName);
            });
        }catch (e){
            return res.status(500).send({ message: 'internal server error' });
        }
    }, function (employeeName) {
        try{
            var employee = new Employee({
                employeeName: employeeName,
                employeeDescription: employeeDescription,
                employeeIcon: employeeIcon
            });

            employee.save(function(err) {
                if (err) return next(err);
                res.send({ message: employeeName + ' has been added successfully!' });
            });
        }catch (e){
            res.status(404).send({ message: employeeName + ' is not a registered citizen of New Eden.' });
        }
    }]);
});


app.use(function(req, res) {
    Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message);
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
            var page = swig.renderFile('views/index.html', { html: html });
            res.status(200).send(page);
        } else {
            res.status(404).send('Page Not Found')
        }
    });
});

app.use(function(err, req, res, next) {
    console.log(err.stack.red);
    res.status(err.status || 500);
    res.send({ message: err.message });
});

/**
 * Socket.io stuff.
 */
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function (socket) {
    console.log('a user connected');
});

http.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
var express = require('express');
var app = express();
var http = require('http');
var pg = require('pg');
pg.defaults.ssl = true; // comment this out during local development
var port = process.env.PORT || 9000
var conString = process.env.DATABASE_URL;
var Sequelize = require('sequelize');
var sequelize = new Sequelize(conString);
var validator = require('validator');
// var pg_client = new pg.Client(conString);
// pg_client.connect();
// var query = pg_client.query('LISTEN addedrecord');

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

var Pairs = sequelize.define('subject_pairs', {
    subject1: {
        type: Sequelize.STRING,
        validate: {
            isAlphanumeric: true,
            not: [";"],
            notContains: 'DROP TABLE'
        }
    },
    subject2: {
        type: Sequelize.STRING,
        validate: {
            isAlphanumeric: true,
            not: [";"],
            notContains: 'DROP TABLE'
        }
    },
    time: {
        type: Sequelize.INTEGER
    },
    timerONOFF: {
        type: Sequelize.STRING
    },
    picture: {
        type: Sequelize.STRING
    },
    inuse: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

Pairs.sync();
// Pairs.sync({force: true}).then(function () {
//     // Table created if it doesn't already exist
//     var pairData = {
//         subject1: '0000a',
//         subject2: '0000b',
//         inuse: 0
//     }
//     return Pairs.create(pairData). then(function(pairs){
//         console.dir(pairs.get())
//     })
// });

var SubjectInfo = sequelize.define('report', {
    subjectNumber: {
        type: Sequelize.STRING,
        primaryKey: true,
        validate: {
            isAlphanumeric: true
        }
    },
    subjectPairId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
             // This is a reference to another model
            model: Pairs,

             // This is the column name of the referenced model
            key: 'id'
        }
    },
    timestamp: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
            not: [";"],
            notContains: 'DROP TABLE'
        }
    },
    gender: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: true
        }
    },
    // recording: {
    //     type: Sequelize.STRING,
    //     validate: {
    //         isAlpha: true
    //     }
    // }
    conditions: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
            not: [";"],
            notContains: 'DROP TABLE'
        }
    },
    correctdifferences: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    results: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: null
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

SubjectInfo.sync();

SubjectInfo.belongsTo(Pairs);
var server = http.createServer(app);

var io = require('socket.io').listen(server);
server.listen(port);
console.log("http server listening on %d", port);

io.sockets.on('connection', function (socket) {
    socket.emit('connected', { connected: true });
    socket.broadcast.emit('user connected');
    console.log('a user connected: '+socket.id);
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('ready for data', function (data) {
        console.log("Waiting for something to happen");
        // console.log(data);
    });

    socket.on('get rooms', function() {
        console.log("get rooms");
        Pairs.findAll({
            where: {
                inuse: 0
            }
        }).then(function(pairs) {
            socket.emit('load pairs', pairs);
            console.log("sent");
        });
    })
    socket.on('new pair', function(data){
        Pairs.sync().then(function () {
            // Table created if it doesn't already exist
            return Pairs.create(data). then(function(pair){
                console.dir(pair.get())
                socket.emit('return created pair',pair);
            })
        });
    });
    socket.on('pair taken',function(data) {
        console.log(data);
        Pairs.findById(data).then(function(pair) {
            // update value of inuse to 1
            pair.update({inuse: '1'})
            console.log("changed: \n", pair);
            console.dir(pair.get())
        })
    })
    socket.on('new user', function(data){
        // console.log('inserting: ',data.subjectNumber);
        subjID = data.subjectNumber;
        console.log(subjID);
        SubjectInfo.sync().then(function () {
        //     console.log(data);
        //     // Table created if it doesn't already exist
            return SubjectInfo.create(data). then(function(subject){
            console.dir(subject.get())
            })
        }, SubjectInfo.findById(subjID).then(function(subject) {
                if (subject) { // if the record exists in the db
                    return subject.update(data);
                    console.dir(subject.get())
                }
            })
    );
    });

    socket.on('results', function(data) {
        subjID = data.subjectNumber;
        console.log(subjID);
        SubjectInfo.findById(subjID).then(function(subject) {
            if (subject) { // if the record exists in the db
                return subject.update(data);
                console.dir(subject.get())
            }
        });
    });
});

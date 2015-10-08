var Sequelize = require('sequelize');
var bodyParser = require('body-parser')
var cors = require('cors');
var express = require('express');
var path = require('path');
var webpack = require('webpack');

var app = express();

var isDevelopment = (process.env.NODE_ENV !== 'production');
var static_path = path.join(__dirname, 'public');

var DB_URL = isDevelopment ? 'postgres://john@localhost/priorities' : process.env.DATABASE_URL;

var sequelize = new Sequelize(DB_URL);

var Priority = sequelize.define('priorities', {
  description: {
    type: Sequelize.STRING,
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});

Priority.sync();

app.use(cors());
app.use(bodyParser.json())

app.use(express.static(static_path))
  .get('/', function (req, res) {
    res.sendFile('index.html', {
      root: static_path
    });
  }).listen(process.env.PORT || 8080, function (err) {
    if (err) { console.log(err) };
    console.log('Listening at localhost:8080');
  });

app.use('/public', express.static('public'));

app.get('/priorities', function(req, res) {
  Priority.findAll().then(function(priorities) {
    res.json({
      priorities: priorities
    });
  });
});

app.post('/submit_priorities', function(req, res) {
  res.json({ success: true });
  console.log(req.body);
  req.body.items.forEach(function(item) {
    Priority.find({
      where: {
        description: item.description
      }
    }).then(function(priority) {
      priority.update({
        score: priority.score + item.priority
      });
    }).catch(function(error) {
      console.log(error);
    });;
  });
});

if (isDevelopment) {
  var config = require('./webpack.config');
  var WebpackDevServer = require('webpack-dev-server');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
  }).listen(3000, 'localhost', function (err, result) {
    if (err) { console.log(err) }
    console.log('Listening at localhost:3000');
  });
}

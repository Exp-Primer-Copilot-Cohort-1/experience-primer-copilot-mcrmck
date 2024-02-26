// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var comments = require('./comments.json');
var _ = require('lodash');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/comments', function(req, res) {
  res.json(comments);
});

app.post('/comments', function(req, res) {
  var newComment = req.body;
  newComment.id = Date.now();
  comments.push(newComment);
  fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
    res.json(comments);
  });
});

app.put('/comments/:id', function(req, res) {
  var updateComment = req.body;
  var index = _.findIndex(comments, function(comment) {
    return comment.id == req.params.id;
  });
  if (index !== -1) {
    var updatedComment = _.assign(comments[index], updateComment);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.json(updatedComment);
    });
  } else {
    res.json('Not found');
  }
});

app.delete('/comments/:id', function(req, res) {
  var index = _.findIndex(comments, function(comment) {
    return comment.id == req.params.id;
  });
  if (index !== -1) {
    comments.splice(index, 1);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.json(comments);
    });
  } else {
    res.json('Not found');
  }
});

app.listen(3001);
console.log('Server is running on port 3001');
```

**comments.json**
```json
[
  {
    "id": 1,
    "author": "Pete Hunt",
    "text": "This is one comment"
  },
  {
    "id": 2,
    "author": "Jordan Walke",
    "text": "This is *another* comment"
  }
]
```

**index.js**
```javascript
// Path: index.js
import React from 'react';
import ReactDOM
var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var Schema = require('../models/schema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Schema.find(function(err, posts) {
    res.json(posts);
    console.log(posts);
  });
});

router.post("/", function(req,res,next){
  console.log("The post function works...? " + req.body);
  Schema.create(req.body, function(err, bPost){
    res.json(bPost);
    console.log(bPost);
  })
});

module.exports = router;
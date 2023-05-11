var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

const { usersDb } = require("../db/mongodb");


/* GET users listing. */
router.get('/', function (req, res, next) {
  usersDb.find({}).then(function (users) {
    // sorted by name field
    console.log({users})
    res.send(users);
  })
});
router.get('/create', function (req, res, next) {
  let uid = uuidv4();
  res.send({uid});
});

module.exports = router;

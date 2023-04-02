var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { db } = require("../db/mongodb");

const calenderDb = db.get("calender");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", function (req, res, next) {
  let uid = uuidv4();
  users.insert({ uid, data: req.body });
  res.send({
    uid,
  });
});

router.post("/:uid", function (req, res, next) {
  const uid = req.params.uid;
  users.find({ uid }).then(function (res) {
    res.send({
      data: res,
    });
  })
  
});

module.exports = router;

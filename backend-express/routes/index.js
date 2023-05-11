var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { appDb } = require("../db/mongodb");

/* GET home page. */
router.get('/all', function (req, res, next) {
  appDb.find({}).then(function (data) {
    // sorted by name field
    console.log({ data })
    res.send(data);
  })
});
router.get('/createUid', function (req, res, next) {
  let uid = uuidv4();
  appDb.insert({ uid })
  res.send({ uid });
});
router.post('/updateData', function (req, res, next) {
  let { uid, data } = req.body;
  appDb.findOneAndUpdate({ uid }, { $set: { data } })
    .then((updatedDoc) => {
      res.send(updatedDoc);
    })

});
// router.post("/calender/", function (req, res, next) {
//   let uid = uuidv4();
//   appDb.insert({ uid, data: req.body });
//   res.send({
//     uid,
//   });
// });

router.post("/getData/:uid", function (req, res, next) {
  const uid = req.params.uid;
  appDb.findOne({ uid }).then(function (data) {
    res.send(data);
  })

});
module.exports = router;

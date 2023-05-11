// const uri = "mongodb://localhost:27017/?retryWrites=true&w=majority";
const uri =
  "mongodb+srv://admin:gXkKvFipScirZbxs@cluster0.u8i8r.mongodb.net/CalenderApp?retryWrites=true&w=majority";
const monk = require("monk");

const db = monk(uri);

db.then(() => {
  console.log("Connected correctly to server");
});



const appDb = db.get("app");
const calenderDb = db.get("calender");
const usersDb = db.get("users");

module.exports = { 
  db, 
  appDb, 
  calenderDb, 
  usersDb 
};

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const { defineSchema } = require("./schema");
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

// let dbConnection = {};

// module.exports = {
//   connectToDB: function (callback) {
//     client.connect(function (err, db) {
//       if (err || !db) {
//         return callback(err);
//       }

//       dbConnection = db.db("NearYu");
//       console.log("Successfully connected to MongoDB.");
//       // defineSchema(dbConnection);
//       return callback();
//     });
//   },

//   getDb: function () {
//     return dbConnection;
//   },
// };
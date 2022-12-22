var express = require("express");
var router = express.Router();
var secret = require("../secrets/secret.json");

const { MongoClient, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://nodeJSUser:" +
  secret.password +
  "@athleteprofileapp.ohhdhij.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

/* Get athletes */
router.get("/athlete", async function (req, res, next) {
  let db = client.db("AthleteProfileApp");
  let collection = db.collection("athletes");
  let athletes = [];
  collection
    .find()
    .forEach((athlete) => {
      athletes.push(athlete);
    })
    .then(() => {
      console.log(athletes);
      res.send(athletes);
    });
});

/* Add athletes */
router.post("/athlete", function (req, res, next) {
  let db = client.db("AthleteProfileApp");
  let collection = db.collection("athletes");
  collection.insertOne(req.body);
  console.log(req.body);
  res.send("Athlete added");
});

/* Update athlete */
router.put("/athlete", function (req, res, next) {
  try {

    let db = client.db("AthleteProfileApp");
    let collection = db.collection("athletes");
    let id = req.body._id;
    let athlete = {
      profileIcon: req.body.profileIcon,
      fullName: req.body.fullName,
      gender: req.body.gender,
      dob: req.body.dob,
      location: req.body.location,
      interests: req.body.interests,
      about: req.body.about,
      team: req.body.team,
      sports: req.body.sports,
      positions: this.state.positions,
    }
    collection.updateOne({ _id: ObjectId(id) }, { $set: req.body });
    console.log(req.body);
    res.send("Athlete updated");
  } catch (error) {
    console.log(error)
    res.status(500).send("Failed");
  }
});

module.exports = router;

const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/shopalot"
  //put in our DB
);

const seeds = [

  {
    
    codename: "turtle-apple",
    listname: "Food List",
    favorites: [
      "bob@gmail.com"
    ],
    items: [{
      _id: 0,
      itemName: "Cereal",
      quantity: 3,
      purchased: false
    },
    {
      _id: 1,
      itemName: "Milk",
      quantity: 3,
      purchased: false
    }]
  },
  {
    
    codename: "dog-peach",
    listname: "Grocery List",
    favorites: [
      "calvinmac633@gmail.com"
    ],
    items: []
  }


]
db.shopalotDB
  .deleteMany({})
  .then(() => db.shopalotDB.collection.insertMany(seeds))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


const db = require("../models");
const { makeCodename } = require('./utils');
// Defining methods for the booksController

module.exports = {
  create: function (req, res) {
    db.shopalotDB
      .create({ listname: req.params.listname, codename: makeCodename() })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findAll: function (req, res) {
    db.shopalotDB.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findOne: function (req, res) {
    console.log("This is req.params -->", req.params)
    db.shopalotDB
      .findOne({ codename: req.params.codename })
      .then(dbModel => {
        console.log("This is dbModel ---> ", dbModel)
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },


  findOneAndUpdate: function (req, res) {
    console.log("This is req.params -->", req.params)
    console.log("This is req.body.favee -->", req.body.favorite)

    if (req.body.favorite) {
      console.log("first option")
      db.shopalotDB
        .findOneAndUpdate(
          { codename: req.params.codename },
          req.body.favorite,
          { new: true }
        )
        .then(dbModel => {
          console.log(dbModel)
          res.json(dbModel)
        })
        .catch(err => {
          console.log(err)
          res.status(422).json(err)
        });
    } else {
      console.log("second option")
      db.shopalotDB
        .findOneAndUpdate(
          { codename: req.params.codename },
          {
            $push: {
              items:
              {
                itemName: req.body.itemName,
                quantity: req.body.quantity
              }
            }
          },
          { new: true }

        )
        .then(dbModel => {
          console.log(dbModel)
          res.json(dbModel)
        })
        .catch(err => {
          console.log(err)
          res.status(422).json(err)
        });
    }

  },
  // findOneAndUpdateFave: function (req, res) {
  //   console.log("This is req.params -->", req.params)
  //   console.log("This is req.body -->", req.body)
  //   db.shopalotDB

  //     .findOneAndUpdate(
  //       { codename: req.params.codename },
  //       req.body,
  //       { new: true }
  //     )
  //     .then(dbModel => {
  //       console.log(dbModel)
  //       res.json(dbModel)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //       res.status(422).json(err)
  //     });
  // },

  remove: function (req, res) {
    console.log("THIS IS REQ.PARAMS --->", req.params)
    db.shopalotDB
      .findOneAndUpdate(
        { codename: req.params.codename },
        {
          $pull: { items: { _id: req.params.id } }
        },
        console.log()
      )

      // .populate("shopalotDBs")
      // .then(dbModel => dbModel.remove())
      .then(dbModel => {
        console.log("DELETE BUTTON DBMODEL", dbModel)
        res.json(dbModel)
      })
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      });
  },
};

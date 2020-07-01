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
    console.log("This is req.body.favee -->", req.body.favorites)

    if (req.body.favorites) {
      console.log("first option")
      db.shopalotDB
        .findOneAndUpdate(
          { codename: req.params.codename },
          { favorites: req.body.favorites },
          { new: true }
        )
        .then(dbModel => {
          console.log("this is db model first (fave) option", dbModel)
          res.json(dbModel)
        })
        .catch(err => {
          console.log(err)
          res.status(422).json(err)
        });
    } else if (req.body.favorites === false) {
      console.log("second option")
      db.shopalotDB
        .findOneAndUpdate(
          { codename: req.params.codename },
          { favorites: req.body.favorites },
          { new: true }
        )
        .then(dbModel => {
          console.log("this is db model first (fave) option", dbModel)
          res.json(dbModel)
        })
        .catch(err => {
          console.log(err)
          res.status(422).json(err)
        });
    }
    else if (req.body.favorites === undefined) {
      console.log("third option")
      db.shopalotDB
        .findOneAndUpdate(
          { codename: req.params.codename },
          {
            $push: {
              items: {
                $each: [
                  {
                    itemName: req.body.itemName,
                    quantity: req.body.quantity
                  }],
                $position: 0,
              }
            }
          },
          { new: true }

        )
        .then(dbModel => {
          console.log("This is second option dbModel", dbModel)
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

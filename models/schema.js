const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listSchema = new Schema({
    codename: String,
    listname: String,
    favorites: Array,
    items: [
        {
            _id: { type: Schema.ObjectId, auto: true }, // --> THIS IS NOT WORKING
            itemName: String,
            quantity: String,
            purchased: Boolean
        }
    ],
    //reference to User?    
});

const shopalotDB = mongoose.model("shopalotDB", listSchema);
module.exports = shopalotDB;
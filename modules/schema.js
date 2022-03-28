const mongoose = require("mongoose");

const Schema = new mongoose.Schema({

    name:String,
    age: Number,

})


module.exports = mongoose.model("schema", Schema);
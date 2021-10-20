const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const word = new Schema({
  words: {
    type: Array,
    require: true,
  },
  font: {
    type: Number,
    require: true,
  },
  colors: {
    type: Array,
    require: true,
  },
});

module.exports = mongoose.model("word", word);

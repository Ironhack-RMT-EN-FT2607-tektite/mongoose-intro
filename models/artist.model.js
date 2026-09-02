const mongoose = require("mongoose")

// creating the Schema => gives format
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // is a mandatory property
    unique: true
  },
  awardsWon: {
    type: Number,
    min: 0,
    default: 0
  },
  isTouring: Boolean,
  genre: {
    type: [String],
    enum: ["rock", "alternative", "nu-metal", "pop", "punk"]
  },
})

// creating the Model => tool that allows us to go into the collection
const Artist = mongoose.model("Artist", artistSchema)
// internal name of the model. Always singular, capitalized and single word.

module.exports = Artist // export things in ES5 or commonJS
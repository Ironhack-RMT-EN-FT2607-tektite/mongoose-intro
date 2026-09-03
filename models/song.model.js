const mongoose = require("mongoose")

// creating the Schema => gives format
const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true
  },
  collaboratingArtists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Artist",
  }
})

const Song = mongoose.model("Song", songSchema)

module.exports = Song
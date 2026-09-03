const express = require("express")
const router = express.Router()

//* routes for Songs
const Song = require("../models/song.model")

router.post("/", async(req, res, next) => {
  // console.log(req.body)
  try {
    await Song.create({
      title: req.body.title,
      releaseDate: req.body.releaseDate,
      artist: req.body.artist,
      collaboratingArtists: req.body.collaboratingArtists
    })
    res.sendStatus(201)
  } catch (error) {
        console.log(error)
    res.status(500).json({errorMessage: error})
  }
})

router.get("/:songId", async(req, res, next) => {
  // console.log(req.params)

  try {
    // const responseSong = await Song.findById(req.params.songId)
    // const responseArtist = await Artist.findById(responseSong.artist)
    // res.json({responseSong, responseArtist})

    const response = await Song
    .findById(req.params.songId)
    .populate({
      path: "artist",
      select: { name: 1, isTouring: 1 }
    })
    // .populate("artist", "name isTouring -_id")

    res.status(200).json(response)

  } catch (error) {
        console.log(error)
    res.status(500).json({errorMessage: error})
  }
})

// GET "/artist/:artistId"

router.get("/", async(req, res, next) => {

  try {
    const response = await Song
    .find()
    .populate({
      path: "artist",
      populate: {
        path: "favOtherArtist"
      }
    })
    .populate({
      path: "collaboratingArtists",
      sort: { awardsWon: -1 },
      limit: 1,
      populate: {
        path: "favOtherArtist"
      }
    })

    res.status(200).json(response)

  } catch (error) {
    console.log(error)
  }
})

module.exports = router
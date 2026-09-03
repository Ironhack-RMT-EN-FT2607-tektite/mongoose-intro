const express = require("express")
const router = express.Router()

//* routes for Artists
const Artist = require("../models/artist.model")

router.post("/", (req, res, next) => {
  console.log(req.body)

  const { name, awardsWon, isTouring, genre, favOtherArtist } = req.body

  Artist.create({ name, awardsWon, isTouring, genre, favOtherArtist })
  .then(() => {
    console.log("artist created")
    // res.sendStatus(201)
    res.status(201).json({message: "artist created, all good"})
  })
  .catch((error) => {
    console.log(error)
  })

})

router.get("/", (req, res, next) => {

  console.log(req.query)

  Artist.find(req.query)
  .select({isTouring: 0})
  .sort({name: 1})
  .then((response) => {

    if (response.length === 0) {
      res.status(204).json(response) // correct way. NEVER use 404 for this.
      return  // stop executing the route
    }

    res.status(200).json(response)
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({errorMessage: error})
  })

})

router.get("/:artistId", async (req, res, next) => {
  console.log(req.params)

  try {
    const response = await Artist.findById(req.params.artistId)

    if (!response) {
      //todo cause an error to be send into the client
      res.status(400).json( { message: "no artist with that id" } )
      return 
    }

    res.status(200).json(response)
    
  } catch (error) {
        console.log(error)
    res.status(500).json({errorMessage: error})
  }


})

router.put("/:artistId", async (req, res, next) => {

  console.log(req.params)
  console.log(req.body)
  
  try {
    
    const response = await Artist.findByIdAndUpdate(req.params.artistId, {
      name: req.body.name,
      awardsWon: req.body.awardsWon,
      isTouring: req.body.isTouring,
      genre: req.body.genre
    }, { 
      returnDocument: "after", // give the document after the update was applied
      runValidators: true // check schema validators before making modifications
    })

    res.status(202).json(response)
    //or... res.sendStatus(202)
    
  } catch (error) {
        console.log(error)
    res.status(500).json({errorMessage: error})
  }

})

// PATCH "/:artistId/genre"

module.exports = router
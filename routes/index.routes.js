const express = require("express")
const router = express.Router()

router.get("/test/:userId", (req, res, next) => {
  console.log("req.body", req.body)
  console.log("req.params", req.params)
  console.log("req.query", req.query)
  res.status(200).json({ message: "all good here from /test!" })
})

const artistsRouter = require("./artists.routes")
router.use("/artists", artistsRouter)

const songsRouter = require("./songs.routes")
router.use("/songs", songsRouter)

module.exports = router
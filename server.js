try {
  process.loadEnvFile()
} catch (error) {
  console.log("no .env found, using default variables if any")
}

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/artist-db")
.then(() => {
  console.log("connected to the database, yay!")
})
.catch(() => {
  console.log("error connecting to the database")
})

const app = express();

// all middlewares & configurations here
app.use(logger("dev"));
app.use(express.static("public"));

// to allow CORS access from anywhere
app.use(cors({
  origin: '*'
}));

// below two configurations will help express routes at correctly receiving data. 
app.use(express.json()); // recognize an incoming Request Object as a JSON Object
app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array


// all routes here...
app.get("/", (req, res, next) => {
  res.json({ message: "all good here!" })
})

app.get("/test/:userId", (req, res, next) => {
  console.log("req.body", req.body)
  console.log("req.params", req.params)
  console.log("req.query", req.query)
  res.json({ message: "all good here from /test!" })
})

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

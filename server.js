try {
  process.loadEnvFile()
} catch (error) {
  console.log("no .env found, using default variables if any")
}

const express = require("express");
const app = express();

require("./db") // automatically looks for a file called index inside the folder.

const applyConfigs = require("./config")
applyConfigs(app)

// test route
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "all good here!" })
})

// all the other routes
const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

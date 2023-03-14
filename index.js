const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const bodyParser = require("body-parser");
const env = require("dotenv");
const router = require("./router/routes.js");
env.config();
const app = express();
const port = process.env.PORT || 4000;
app.use(cors({origin: "*"}));
app.use(bodyParser.urlencoded({ limit:"30mb", extended: true }));
app.use(bodyParser.json({limit:"30mb", extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/",router);


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => {
    console.log(`Server listening on port ${port} & db connected`);
  }))
  .catch((error) => console.log(error.message));

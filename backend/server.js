const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require('dotenv')
dotenv.config()

const userRouter = require('./routes/user');
const urlRouter = require('./routes/urlActions');
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);


app.use(bodyParser.json());
// DB Config

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use('/user',userRouter);
app.use('/url',urlRouter);
const port = process.env.PORT || 5005; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
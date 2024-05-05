const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.MONGO_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to the database:", err));

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/weather")
  .then(() => console.log("connected to the mongodb"))
  .catch((err) =>
    console.log("error occured connecting mongodb database" + err)
  );

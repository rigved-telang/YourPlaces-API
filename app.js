const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const HttpError = require("./models/http-error");
const placesRouter = require("./routes/places-routes");
const usersRouter = require("./routes/users-routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/places", placesRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  return next(new HttpError("Could not find this route", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@projects.c9uecco.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log("DB error");
    console.log(err);
  });

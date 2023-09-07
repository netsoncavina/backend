const mongoose = require("mongoose");

const pet = mongoose.model(
  "pets",
  new mongoose.Schema(
    {
      petName: String,
      petAge: Number,
      petType: String,
      petBreed: String,
      petImage: String,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { pet };

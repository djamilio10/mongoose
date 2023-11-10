const mongoose = require("mongoose");
//Création de prototype pour une personne :
const schemaPersone = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoritesFoods: [String],
});
const person = mongoose.model("personne", schemaPersone);
module.exports = person;

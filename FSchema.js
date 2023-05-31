const mongoose = require(`mongoose`);

const FBlueprint = new mongoose.Schema({
  Name: String,
  Type: String,
  Description: String,
});

module.exports = new mongoose.model(`FCollection`, FBlueprint);

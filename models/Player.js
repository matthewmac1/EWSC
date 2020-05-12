const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  player: {
    type: String,
    required: true
  },
  pac: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  sho: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  pas: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  dri: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  def: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  phy: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  }
});

module.exports = Player = mongoose.model('player', PlayerSchema);

const express = require('express');
const router = express.Router();

const Player = require('../../models/Player');

// @route GET api/Player
// @desc Get All Player
// @access Public
router.get('/',(req, res) => {
  Player.find()
    .sort({ player: -1 })
    .then(players => res.json(players))
    .catch((error) => console.log(error));
});

// @route POST api/Player
// @desc Create a Player
// @access Public
router.post('/',(req, res) => {
  const newPlayer = new Player({
    player: req.body.player,
    pac: req.body.pac,
    sho: req.body.sho,
    pas: req.body.pas,
    dri: req.body.dri,
    def: req.body.def,
    phy: req.body.phy
  });

  newPlayer.save().then(player => res.json(player));
});

// @route DELETE api/Player
// @desc Delete an Player
// @access Public
router.delete('/:id',(req, res) => {
  Player.findById(req.params.id)
    .then(player => player.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;

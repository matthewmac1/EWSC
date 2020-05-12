const express = require('express');
const router = express.Router();
//Can be used to authenticate (if it worked)
//const auth = require('../../middleware/auth');

const Team = require('../../models/Team');
const Player = require('../../models/Player');
// @route GET api/teamss
// @desc Get All teams
// @access Public
router.get('/',(req, res) => {
  Team.find()
    .then(teams => res.json(teams))
    .catch((error) => console.log(error));
});

router.get('/:teamId', (req, res) => {
  Team.find({ _id: req.params.teamId })
    .then(teams => res.json(teams))
    .catch((error) => console.log(error));
})

router.get('/:teamId/players', (req, res) => {
  Player.find()
    .sort({ player: -1 })
    .then(players => res.json(players))
    .catch((error) => console.log(error));
});

// @route POST api/teams
// @desc Create a team
// @access Public
router.post('/', (req, res) => {
  const newTeam = new Team({
    name: req.body.name
  });

  newTeam.save().then(team => res.json(team));
});

router.patch('/:id', (req, res) => {
  Team.findById(req.params.id)
    .then(team)
});

// @route DELETE api/teams
// @desc Delete a team
// @access Public
router.delete('/:id', (req, res) => {
  Team.findById(req.params.id)
    .then(team => team.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;

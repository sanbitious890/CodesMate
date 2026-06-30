const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('joinedProjects', 'title techStack status');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/me', protect, async (req, res) => {
  try {
    const { name, bio, skills, github, profilePic } = req.body;
    const user = await User.findById(req.user._id);
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.skills = skills || user.skills;
    user.github = github || user.github;
    user.profilePic = profilePic || user.profilePic;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
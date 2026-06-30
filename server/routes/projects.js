const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Project = require('../models/Project');
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = { $or: [{ title: { $regex: search, $options: 'i' } }, { techStack: { $regex: search, $options: 'i' } }] };
    }
    const projects = await Project.find(query).populate('creator', 'name profilePic').populate('members', 'name profilePic').sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { title, description, techStack, teamSize } = req.body;
    const project = await Project.create({ title, description, techStack, teamSize: teamSize || 1, creator: req.user._id, members: [req.user._id] });
    await User.findByIdAndUpdate(req.user._id, { $push: { joinedProjects: project._id } });
    const populatedProject = await Project.findById(project._id).populate('creator', 'name profilePic').populate('members', 'name profilePic');
    res.status(201).json(populatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('creator', 'name profilePic email bio skills github').populate('members', 'name profilePic email bio skills github');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.creator.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });
    const { title, description, techStack, teamSize, status } = req.body;
    project.title = title || project.title;
    project.description = description || project.description;
    project.techStack = techStack || project.techStack;
    project.teamSize = teamSize || project.teamSize;
    project.status = status || project.status;
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.creator.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });
    await project.deleteOne();
    await User.updateMany({ joinedProjects: req.params.id }, { $pull: { joinedProjects: req.params.id } });
    res.json({ message: 'Project removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/:id/join', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.status !== 'open') return res.status(400).json({ message: 'Project is not open' });
    if (project.members.includes(req.user._id)) return res.status(400).json({ message: 'Already a member' });
    if (project.members.length >= project.teamSize) return res.status(400).json({ message: 'Team is full' });
    project.members.push(req.user._id);
    await project.save();
    await User.findByIdAndUpdate(req.user._id, { $push: { joinedProjects: project._id } });
    const updatedProject = await Project.findById(project._id).populate('creator', 'name profilePic').populate('members', 'name profilePic');
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
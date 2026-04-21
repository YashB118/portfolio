const router = require('express').Router();
const Project = require('../models/Project');
const { generalLimiter } = require('../middleware/rateLimiter');

router.use(generalLimiter);

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter =
      category && category !== 'ALL'
        ? { category: { $in: [category.toUpperCase()] } }
        : {};
    const projects = await Project.find(filter).sort({ order: 1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    console.error('Projects GET error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 }).limit(3);
    res.json({ success: true, data: projects });
  } catch (err) {
    console.error('Featured projects error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

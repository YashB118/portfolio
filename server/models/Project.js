const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  subtitle:    { type: String, trim: true },
  description: { type: String, trim: true },
  tags:        [{ type: String, trim: true }],
  category:    [{ type: String, trim: true }],
  githubUrl:   { type: String, trim: true, default: '' },
  liveUrl:     { type: String, trim: true, default: '' },
  featured:    { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
  gradient:    { type: String, default: 'linear-gradient(135deg, #2d2d2d 0%, #4a4a4a 100%)' }
});

module.exports = mongoose.model('Project', ProjectSchema);

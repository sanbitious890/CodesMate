const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a project title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    techStack: {
      type: [String],
      required: [true, 'Please add at least one technology'],
    },
    teamSize: {
      type: Number,
      required: [true, 'Please specify team size'],
      min: 1,
      max: 20,
      default: 1,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: {
      type: String,
      enum: ['open', 'in-progress', 'completed'],
      default: 'open',
    },
  },
  { timestamps: true }
);

projectSchema.pre('save', function (next) {
  if (this.isNew && !this.members.includes(this.creator)) {
    this.members.push(this.creator);
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema);
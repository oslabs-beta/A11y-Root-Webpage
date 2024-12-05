import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  pages: [{ type : Schema.Types.ObjectId, ref: 'Page' }]
})

const ProjectModel = mongoose.model('Project', projectSchema);

export default ProjectModel;
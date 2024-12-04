import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const elementSchema = new Schema({
  role: { type: String, required: true },
  name: { type: String, default:'' },
  level: { type: Number, default: null },
  children: [{ type : Schema.Types.ObjectId, ref: 'Element' }],
  compliance: { type: Boolean },
  complianceDetails: { type: String, default: '' }
})

const ElementModel = mongoose.model('Element', elementSchema);

const pageSchema = new Schema({
  project: { type : Schema.Types.ObjectId, ref: 'Project' },
  url: { type: String, required: true },
  pageRole: { type: String },
  pageName: { type: String },
  tree: { type: [elementSchema],  required: [true, 'A tree property of elements is required'] },
  skipLink: { type: Boolean, required: [true, 'A skip link must be present'] },
  h1: { type: Boolean, required: [true, 'An h1 tag must be present'] }
})

const PageModel = mongoose.model('Page', pageSchema);

export default { ElementModel, PageModel };
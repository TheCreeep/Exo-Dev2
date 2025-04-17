import mongoose from 'mongoose';
import autoIncrementPlugin from '../utils/autoIncrement.js';

const incidentSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  localisation: {
    type: String,
    required: [true, 'Localisation is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['pending', 'in_progress', 'resolved'],
    default: 'pending'
  },
  reportedAt: {
    type: Date,
    default: Date.now
  },
  callerId: {
    type: Number,
    required: [true, 'Caller ID is required'],
    ref: 'Caller'
  },
  operatorId: {
    type: Number,
    required: [true, 'Operator ID is required'],
    ref: 'Operator'
  },
  teamId: {
    type: Number,
    ref: 'Team'
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function(doc, ret) {
      ret._id = ret.id;
      delete ret.id;
      return ret;
    }
  }
});

incidentSchema.plugin(autoIncrementPlugin, { model: 'Incident', field: 'id' });

incidentSchema.statics.reportIncident = async function(incidentData) {
  return await this.create(incidentData);
};

incidentSchema.statics.fetchIncidents = async function() {
  return await this.find({})
    .populate('callerId', 'name phone')
    .populate('operatorId', 'name')
    .populate('teamId', 'type availability');
};

incidentSchema.statics.editStatusIncident = async function(incidentId, status) {
  return await this.findOneAndUpdate(
    { id: incidentId },
    { status },
    { new: true, runValidators: true }
  );
};

const Incident = mongoose.model('Incident', incidentSchema);

export default Incident; 
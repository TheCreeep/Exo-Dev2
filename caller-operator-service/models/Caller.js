import mongoose from 'mongoose';
import autoIncrementPlugin from '../utils/autoIncrement.js';

const callerSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    unique: true
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

callerSchema.plugin(autoIncrementPlugin, { model: 'Caller', field: 'id' });

callerSchema.statics.createNewCaller = async function(callerData) {
  return await this.create(callerData);
};

callerSchema.statics.fetchCallers = async function() {
  return await this.find({});
};

const Caller = mongoose.model('Caller', callerSchema);

export default Caller; 
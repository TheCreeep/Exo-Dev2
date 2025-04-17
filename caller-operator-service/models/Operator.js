import mongoose from 'mongoose';
import autoIncrementPlugin from '../utils/autoIncrement.js';

const operatorSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
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

operatorSchema.plugin(autoIncrementPlugin, { model: 'Operator', field: 'id' });

operatorSchema.statics.createNewOperator = async function(operatorData) {
  return await this.create(operatorData);
};

operatorSchema.statics.fetchOperators = async function() {
  return await this.find({});
};

const Operator = mongoose.model('Operator', operatorSchema);

export default Operator; 
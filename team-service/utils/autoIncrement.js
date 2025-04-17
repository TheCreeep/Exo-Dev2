import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  model: { type: String, required: true },
  field: { type: String, required: true },
  count: { type: Number, default: 1 }
});

const Counter = mongoose.model('Counter', counterSchema);

const autoIncrementPlugin = (schema, options) => {
  schema.pre('save', async function(next) {
    if (this.isNew) {
      try {
        const counter = await Counter.findOneAndUpdate(
          { model: options.model, field: options.field },
          { $inc: { count: 1 } },
          { new: true, upsert: true }
        );
        this[options.field] = counter.count;
      } catch (error) {
        return next(error);
      }
    }
    next();
  });
};

export default autoIncrementPlugin; 
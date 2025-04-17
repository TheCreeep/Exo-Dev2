import mongoose from 'mongoose';
import autoIncrementPlugin from '../utils/autoIncrement.js';

const teamSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  type: {
    type: String,
    required: [true, 'Team type is required'],
    trim: true
  },
  availability: {
    type: Boolean,
    default: true
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

teamSchema.plugin(autoIncrementPlugin, { model: 'Team', field: 'id' });

teamSchema.statics.createNewTeam = async function(teamData) {
  return await this.create(teamData);
};

teamSchema.statics.fetchTeams = async function() {
  return await this.find({});
};

teamSchema.statics.findAvailableTeam = async function() {
  return await this.findOne({ availability: true });
};

teamSchema.statics.updateTeamAvailability = async function(teamId, availability) {
  return await this.findOneAndUpdate(
    { id: teamId },
    { availability },
    { new: true, runValidators: true }
  );
};

const Team = mongoose.model('Team', teamSchema);

export default Team; 
import mongoose from 'mongoose';

const prayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  request: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Prayer', prayerSchema);
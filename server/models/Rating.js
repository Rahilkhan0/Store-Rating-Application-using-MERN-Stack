import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
}, {
  timestamps: true
});

// Create compound index to enforce unique user-store combination
ratingSchema.index({ user_id: 1, store_id: 1 }, { unique: true });

export default mongoose.model('Rating', ratingSchema);
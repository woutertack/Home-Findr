import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  property: {
    type: mongoose.Types.ObjectId,
    ref: "Property",
    required: true
  }
});

export default mongoose.model('Favorite', FavoriteSchema);
import mongoose from 'mongoose';

export interface ICard {
  name: string;
  link: string;
  createdAt: Date;
  owner: mongoose.Schema.Types.ObjectId;
  likes: Array<mongoose.Schema.Types.ObjectId>;
}

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array<mongoose.Schema.Types.ObjectId>,
    default: [],
  },
});

export default mongoose.model<ICard>('card', cardSchema);

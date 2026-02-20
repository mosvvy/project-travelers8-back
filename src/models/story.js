import { Schema, model, Types } from 'mongoose';

const articleSchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    article: {
      type: String,
      required: true,
    },

    category: {
      type: Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    ownerId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    favoriteCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = model('Article', articleSchema);

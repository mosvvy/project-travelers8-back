// src/models/user.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    articlesAmount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    savedArticles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Story',
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email;
  }
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);

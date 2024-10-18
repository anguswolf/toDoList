import { activityStatus } from "../const/const.js";
import { Schema } from "mongoose";
import mongoose from "mongoose";
const activitySchema = new Schema({
    name: String,
    description: String,
    dueDate: { type: Date , default: Date.now },
    status: { type: String, default: activityStatus.open },
    ownerId: {type: Schema.Types.ObjectId, default: null},
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      writeConcern: {w: 1, wtimeout: 2000},
    }
  }
);
activitySchema.index({ name: 1 });
export const activityModel = mongoose.model('activities', activitySchema);
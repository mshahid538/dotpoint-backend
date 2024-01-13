import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, require: true },
  amount: { type: Number, require: true },
  isActive: { type: Boolean, default: true },
  expAt: { type: Date, require:true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "user" },
}, { timestamps: true });

export const couponModel = mongoose.model<any>('coupon', couponSchema);
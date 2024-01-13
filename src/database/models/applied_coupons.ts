import mongoose from 'mongoose';

const appliedCouponSchema = new mongoose.Schema({
  coupon: { type: mongoose.Schema.Types.ObjectId, ref: "coupon" },
  appliedBy: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "user" },
}, { timestamps: true });

export const appliedCouponModel = mongoose.model<any>('applied_coupon', appliedCouponSchema);
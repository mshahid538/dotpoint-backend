import { Request, Response } from "express";
import { couponModel, appliedCouponModel } from "../../database";
import { responseMessage } from "../../helper";
import { apiResponse } from "../../common";

export const validate_coupon = async (req: Request, res: Response) => {
    let { couponCode } = req.body;
    const userId = req.headers.user["_id"];
    console.log(userId)
    try {
        if (!userId || !couponCode)
            return res
                .status(400)
                .json(await apiResponse(400, responseMessage?.invalidId(" or missing fields"), {}, {}));

        let coupon = await couponModel.findOne({ code: { $eq: couponCode } });
        if (!coupon)
            return res.status(400).json(await apiResponse(400, responseMessage?.invalidId("coupon code"), {}, {}));

        let usedCoupon = await appliedCouponModel.findOne({ appliedBy: { $eq: userId }, coupon: { $eq: coupon._id } });
        if (usedCoupon) return res.status(400).json(await apiResponse(400, responseMessage?.usedCoupon, {}, {}));
        else
            return res
                .status(200)
                .json(await apiResponse(200, responseMessage?.couponApplied, { discount: coupon.amount }, {}));
    } catch (error) {
        console.log(error);
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error));
    }
};


// PLEASE USE THIS IN THE PAYMENT ENDPOINT

// let response = await new appliedCouponModel({ coupon: coupon._id, appliedBy: userId }).save();
// if (response) return res.status(200).json(await apiResponse(200, responseMessage?.couponApplied, response, {}));
// else return res.status(400).json(await apiResponse(400, "failed to apply coupon code", {}, `${response}`));

import { Request, Response } from "express";
import { couponModel, userModel } from "../../database";
import { responseMessage } from "../../helper";
import { apiResponse } from "../../common";

export const all_coupons = async (req: Request, res: Response) => {
    try {
        let response = await couponModel.find();
        if (!response || response.length <= 0)
            return res
                .status(400)
                .json(await apiResponse(400, responseMessage?.getDataNotFound("coupon codes"), {}, {}));

        if (response)
            return res
                .status(200)
                .json(await apiResponse(200, responseMessage?.getDataSuccess("coupon codes"), response, {}));
        else return res.status(400).json(await apiResponse(400, responseMessage?.addDataError, {}, `${response}`));
    } catch (error) {
        console.log(error);
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error));
    }
};

export const add_coupon = async (req: Request, res: Response) => {
    let { code, amount, duration } = req.body;
    const userId = req.headers.user["_id"];
    try {
        if (!userId || !code || !amount || !duration)
            return res
                .status(400)
                .json(await apiResponse(400, responseMessage?.invalidId(" or missing fields"), {}, {}));

        let AlReadyExistCode = await couponModel.findOne({ code });
        if (AlReadyExistCode)
            return res
                .status(400)
                .json(await apiResponse(400, responseMessage?.dataAlreadyExist("coupon code"), {}, {}));

        let expAt = new Date();
        expAt.setDate(expAt.getDate() + parseInt(duration));
        let response = await new couponModel({ code, amount, createdBy: userId, expAt }).save();
        if (response)
            return res
                .status(200)
                .json(await apiResponse(200, responseMessage?.addDataSuccess("coupon code"), response, {}));
        else return res.status(400).json(await apiResponse(400, responseMessage?.addDataError, {}, `${response}`));
    } catch (error) {
        console.log(error);
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error));
    }
};

export const update_coupon = async (req: Request, res: Response) => {
    const { couponId, code, amount, duration, isActive } = req.body;
    try {
        let coupon = await couponModel.findOne({ _id: { $eq: couponId } });
        if (!coupon) return res.status(400).json(await apiResponse(400, responseMessage?.invalidId(" Coupon"), {}, {}));

        if (code) {
            if (coupon.code === code)
                return res
                    .status(400)
                    .json(await apiResponse(400, responseMessage?.dataAlreadyExist("coupon code"), {}, {}));
            else coupon.code = code;
        }
        if (duration) {
            coupon.expAt = new Date(duration);
        }
        if (amount) {
            coupon.amount = amount;
        }
        if (isActive) {
            coupon.isActive = isActive;
        }
        let response = await coupon.save();
        if (response)
            return res
                .status(200)
                .json(await apiResponse(200, responseMessage?.updateDataSuccess("coupon code"), response, {}));
        else return res.status(400).json(await apiResponse(400, responseMessage?.addDataError, {}, `${response}`));
    } catch (error) {
        console.log(error);
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error));
    }
};

export const delete_coupon = async (req: Request, res: Response) => {};

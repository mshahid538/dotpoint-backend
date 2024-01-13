import { Request, Response, NextFunction } from "express";
import { userModel } from "../database/models/user";
import { responseMessage } from "../helper";
import { apiResponse } from "../common";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers.user)
    let { userId } = req.body;
    try {
        let user = await userModel.findOne({ _id: { $eq: userId } });
        if (!user || user.userType !== 0)
            return res.status(401).json(await apiResponse(401, responseMessage?.invalidId(" user"), {}, {}));
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error));
    }
};

export default isAdmin;

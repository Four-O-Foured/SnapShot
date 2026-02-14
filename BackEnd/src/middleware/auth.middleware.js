import { ApiError } from "../utils/ApiError.js";
import { verifyToken } from "../utils/helper.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { findUserById } from "../DAO/user.dao.js";


export const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }
    const decoded = verifyToken(token);
    const user = await findUserById(decoded.userId);
    if (!user) {
        throw new ApiError(401, "Unauthorized");
    }
    req.user = user;
    next();
});
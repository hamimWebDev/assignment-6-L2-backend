"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsynch_1 = __importDefault(require("../../utils/catchAsynch"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const users_services_1 = require("./users.services");
const auth_model_1 = require("../Auth/auth.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const getUser = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield users_services_1.UserServices.getUserFromDb(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Get user successfully',
        data: result,
    });
}));
const updateUser = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield users_services_1.UserServices.updateUserIntoDb(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User updated successfully',
        data: result,
    });
}));
const deleteUser = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield users_services_1.UserServices.deleteUserAccountFromDb(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User deleted successfully',
        data: result,
    });
}));
const followUser = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get email or username from JWT payload (req.user)
    var _a, _b;
    const userIdentifier = ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email) || ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.username);
    console.log(req === null || req === void 0 ? void 0 : req.user);
    // Find the follower user using email or username
    const follower = yield auth_model_1.User.findOne({
        $or: [{ email: userIdentifier }, { username: userIdentifier }],
    });
    // User not found
    if (!follower) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const followerId = follower._id; // Follower's ID
    const followeeId = req.params.userId; // Followee's ID from the route
    // console.log(followeeId)
    // Call the service to follow the user
    const result = yield users_services_1.UserServices.followUser(followerId, followeeId);
    // Send the response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully followed the user',
        data: result,
    });
}));
const unFollowUser = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Get email or username from JWT payload (req.user)
    const userIdentifier = ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email) || ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.username);
    console.log(req === null || req === void 0 ? void 0 : req.user);
    // console.log(userIdentifier);
    // Find the follower user using email or username
    const follower = yield auth_model_1.User.findOne({
        $or: [{ email: userIdentifier }, { username: userIdentifier }],
    });
    // User not found
    if (!follower) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const followerId = follower._id; // Follower's ID
    const followeeId = req.params.userId; // Followee's ID from the route
    console.log(followeeId);
    // Call the service to follow the user
    const result = yield users_services_1.UserServices.unfollowUser(followerId, followeeId);
    // Send the response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully unFollowed the user',
        data: result,
    });
}));
// get recipes by id
const getAllRecipesbyUserId = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req.params;
    const email = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email;
    const result = yield users_services_1.UserServices.getAllRecipesByUserId(userId, email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully retrive all recipes by user',
        data: result,
    });
}));
exports.UserController = {
    getUser,
    updateUser,
    deleteUser,
    followUser,
    unFollowUser,
    getAllRecipesbyUserId
};

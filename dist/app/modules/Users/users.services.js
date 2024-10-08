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
exports.UserServices = void 0;
const auth_model_1 = require("../Auth/auth.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const recipes_model_1 = require("../Recipes/recipes.model");
const getUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findOne({
        _id: id,
        isBlocked: false,
        isDeleted: false,
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return user;
});
const updateUserIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findOne({
        _id: id,
        isDeleted: false,
        isBlocked: false,
    });
    // if user not found
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found');
    }
    const { email: newEmail, username: newUsername } = payload;
    const emailCheck = yield auth_model_1.User.isUserExistsByEmail(newEmail);
    const userNameCheck = yield auth_model_1.User.findOne({ username: newUsername });
    if (emailCheck) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'This email is already taken');
    }
    if (userNameCheck) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'This userName is already taken');
    }
    const updatedUser = yield auth_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return updatedUser;
});
const deleteUserAccountFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const followUser = (followerId, followeeId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Prevent a user from following themselves
    if (followerId.equals(followeeId)) {
        throw new Error('You cannot follow yourself');
    }
    // Find both users (follower and followee)
    const follower = (yield auth_model_1.User.findById(followerId));
    const followee = yield auth_model_1.User.findById(followeeId);
    if (!followee) {
        throw new Error('User not found');
    }
    // Prevent following if the user is deleted or blocked
    if (followee.isDeleted || followee.isBlocked) {
        throw new Error('Cannot follow this user');
    }
    // Default to an empty array if follower.following or followee.followers is undefined
    const followingList = (_a = follower === null || follower === void 0 ? void 0 : follower.following) !== null && _a !== void 0 ? _a : [];
    const followersList = (_b = followee === null || followee === void 0 ? void 0 : followee.followers) !== null && _b !== void 0 ? _b : [];
    // Check if the user is already following
    if (followingList.includes(followeeId)) {
        throw new Error('Already following');
    }
    // Add followee to the following list
    followingList.push(followeeId);
    // Add follower to the followers list
    followersList.push(followerId);
    // Save both users
    follower.following = followingList; // Ensure to assign the updated following list
    yield follower.save();
    yield auth_model_1.User.findByIdAndUpdate(followeeId, { followers: followersList });
    return followersList.length; // Return the number of followers
});
const unfollowUser = (followerId, followeeId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Prevent a user from unfollowing themselves
    if (followerId.equals(followeeId)) {
        throw new Error('You cannot unfollow yourself');
    }
    // Find both users (follower and followee)
    const follower = (yield auth_model_1.User.findById(followerId));
    const followee = yield auth_model_1.User.findById(followeeId);
    if (!followee) {
        throw new Error('User not found');
    }
    // Default to an empty array if follower.following or followee.followers is undefined
    const followingList = (_a = follower === null || follower === void 0 ? void 0 : follower.following) !== null && _a !== void 0 ? _a : [];
    const followersList = (_b = followee === null || followee === void 0 ? void 0 : followee.followers) !== null && _b !== void 0 ? _b : [];
    // Check if the user is not following the followee
    if (!followingList.includes(followeeId)) {
        throw new Error('You are not following this user');
    }
    // Remove the followee from the follower's following list
    follower.following = followingList.filter((followingId) => !followingId.equals(followeeId));
    // Remove the follower from the followee's followers list
    const updatedFollowersList = followersList.filter((followerIdInList) => !followerIdInList.equals(followerId));
    // Save both users
    yield follower.save();
    yield auth_model_1.User.findByIdAndUpdate(followeeId, { followers: updatedFollowersList });
    return updatedFollowersList.length; // Return the updated number of followers
});
const getAllRecipesByUserId = (userId, email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findOne({ email: email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // Check if the user is premium or admin
    const isPremium = user.isPremium || user.role === 'admin';
    // Query to fetch recipes based on the user's premium status
    const recipes = yield recipes_model_1.Recipe.find(Object.assign({ author: userId, isDeleted: false, isPublished: true }, (isPremium ? {} : { isPremium: false })));
    return recipes; // Return the fetched recipes
});
exports.UserServices = {
    getUserFromDb,
    updateUserIntoDb,
    deleteUserAccountFromDb,
    followUser,
    unfollowUser,
    getAllRecipesByUserId,
};

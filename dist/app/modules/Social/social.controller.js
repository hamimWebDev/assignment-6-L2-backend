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
exports.SocialController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsynch_1 = __importDefault(require("../../utils/catchAsynch"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const social_service_1 = require("./social.service");
// Add rating to a recipe
const addRating = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { rating } = req.body;
    const { recipeId } = req.params;
    const result = yield social_service_1.SocialServices.addRating(id, recipeId, rating); // Call service to add rating
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Rating added successfully',
        data: result, // Send back the updated recipe with virtual fields
    });
}));
// Add comment to a recipe
const addComment = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user; // Get the user ID from the authenticated request
    const { content } = req.body; // Get the comment text from the request body
    const { recipeId } = req.params; // Get the recipe ID from the URL params
    const result = yield social_service_1.SocialServices.addComment(id, recipeId, content); // Call service to add comment
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Comment added successfully',
        data: result, // Send back the updated recipe with comments
    });
}));
// Update comment on a recipe
const updateComment = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user; // User ID from authenticated request
    const { content } = req.body; // New content for the comment
    const { recipeId, commentId } = req.params; // Recipe ID and Comment ID (_id) from URL params
    const result = yield social_service_1.SocialServices.updateComment(id, recipeId, commentId, content); // Call service to update comment
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Comment updated successfully',
        data: result, // Send back the updated recipe
    });
}));
// Delete comment on a recipe
const deleteComment = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user; // User ID from authenticated request
    const { recipeId, commentId } = req.params; // Recipe ID and Comment ID (_id) from URL params
    const result = yield social_service_1.SocialServices.deleteComment(id, recipeId, commentId); // Call service to delete comment
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Comment deleted successfully',
        data: result, // Send back the updated recipe
    });
}));
// Upvote or downvote a recipe
const vote = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vote } = req.body; // 1 for upvote, -1 for downvote
    const { recipeId } = req.params;
    const { id: userId } = req.user; // User ID from authentication
    const updatedRecipe = yield social_service_1.SocialServices.voteRecipe(userId, recipeId, vote);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Vote submitted successfully',
        data: updatedRecipe,
    });
}));
exports.SocialController = {
    addRating,
    addComment,
    updateComment,
    deleteComment,
    vote,
};

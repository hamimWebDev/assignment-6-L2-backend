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
exports.SocialServices = exports.deleteComment = exports.updateComment = exports.addComment = exports.addRating = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const comment_model_1 = require("../Comment/comment.model");
const rating_model_1 = require("../Rating/rating.model");
const recipes_model_1 = require("../Recipes/recipes.model");
const http_status_1 = __importDefault(require("http-status"));
// Add or update rating
const addRating = (userId, recipeId, ratingValue) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Check if the recipe exists
    const recipe = yield recipes_model_1.Recipe.findById(recipeId);
    if (!recipe) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Recipe not found');
    }
    // Check if the user has already rated this recipe
    const existingRating = yield rating_model_1.Rating.findOne({ recipe: recipeId, user: userId });
    if (existingRating) {
        // If a rating already exists, update it
        existingRating.rating = ratingValue;
        yield existingRating.save();
    }
    else {
        // If no existing rating, create a new one
        const newRating = new rating_model_1.Rating({
            user: userId,
            recipe: recipeId,
            rating: ratingValue,
        });
        yield newRating.save();
        // Push the rating reference to the recipe's `ratings` array
        (_a = recipe === null || recipe === void 0 ? void 0 : recipe.ratings) === null || _a === void 0 ? void 0 : _a.push(newRating._id);
        yield recipe.save();
    }
    // Recalculate and return the updated recipe with average rating and other virtual fields
    const updatedRecipe = yield recipes_model_1.Recipe.findById(recipeId)
        .populate('ratings') // Populate to calculate averageRating
        .lean()
        .exec();
    return updatedRecipe;
});
exports.addRating = addRating;
const addComment = (userId, recipeId, content) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Find the recipe by ID
    const recipe = yield recipes_model_1.Recipe.findById(recipeId);
    if (!recipe) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Recipe not found');
    }
    // Create a new comment
    const newComment = yield comment_model_1.Comment.create({
        recipe: recipeId,
        user: userId,
        content: content,
    });
    // Add the new comment's ID to the recipe's comments array
    (_a = recipe === null || recipe === void 0 ? void 0 : recipe.comments) === null || _a === void 0 ? void 0 : _a.push(newComment._id);
    // Save the updated recipe with the new comment reference
    yield recipe.save();
    // Optionally, return the updated recipe with populated comments
    return recipes_model_1.Recipe.findById(recipeId).populate('comments').lean().exec(); // Populates comments and returns plain JS object
});
exports.addComment = addComment;
const updateComment = (userId, recipeId, commentId, // This is the _id of the comment
content) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the recipe by ID
    const recipe = yield recipes_model_1.Recipe.findById(recipeId);
    if (!recipe) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Recipe not found');
    }
    // Find the comment by _id and userId
    const existingComment = yield comment_model_1.Comment.findOne({
        _id: commentId,
        user: userId,
        recipe: recipeId, // Ensure the comment belongs to the recipe
    });
    if (!existingComment) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found');
    }
    // Update the content of the comment
    existingComment.content = content;
    // Save the updated comment
    yield existingComment.save();
    // Optionally, return the updated recipe with populated comments
    return recipes_model_1.Recipe.findById(recipeId).populate('comments').lean().exec(); // Populates comments
});
exports.updateComment = updateComment;
const deleteComment = (userId, recipeId, commentId // This is the _id of the comment
) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Find the recipe by ID
    const recipe = yield recipes_model_1.Recipe.findById(recipeId);
    if (!recipe) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Recipe not found');
    }
    // Find and validate the comment
    const existingComment = yield comment_model_1.Comment.findOne({
        _id: commentId,
        user: userId,
        recipe: recipeId, // Ensure the comment belongs to the recipe
    });
    if (!existingComment) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found');
    }
    // Remove the comment from the Comment model
    yield comment_model_1.Comment.deleteOne({ _id: commentId });
    // Remove the reference from the recipe
    recipe.comments = (_a = recipe === null || recipe === void 0 ? void 0 : recipe.comments) === null || _a === void 0 ? void 0 : _a.filter((comment) => comment.toString() !== commentId);
    // Save the updated recipe
    yield recipe.save();
    // Return the updated recipe with populated comments if needed
    return recipes_model_1.Recipe.findById(recipeId).populate('comments').lean().exec();
});
exports.deleteComment = deleteComment;
// Upvote or downvote a recipe
const voteRecipe = (userId, recipeId, voteValue) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const recipe = yield recipes_model_1.Recipe.findById(recipeId);
    if (!recipe) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Recipe not found');
    }
    const existingVote = (_a = recipe === null || recipe === void 0 ? void 0 : recipe.votes) === null || _a === void 0 ? void 0 : _a.find((v) => v.user.toString() === userId);
    if (existingVote) {
        // If the user has already voted
        if (existingVote.vote === voteValue) {
            // If the user votes the same, remove the vote (toggle)
            recipe.votes = (_b = recipe === null || recipe === void 0 ? void 0 : recipe.votes) === null || _b === void 0 ? void 0 : _b.filter((v) => v.user.toString() !== userId);
        }
        else {
            // If the user changes their vote (upvote to downvote or vice versa)
            existingVote.vote = voteValue;
        }
    }
    else {
        // If the user hasn't voted yet
        (_c = recipe === null || recipe === void 0 ? void 0 : recipe.votes) === null || _c === void 0 ? void 0 : _c.push({ user: userId, vote: voteValue });
    }
    yield recipe.save();
    return recipe;
});
exports.SocialServices = {
    addRating: exports.addRating,
    addComment: exports.addComment,
    updateComment: exports.updateComment,
    deleteComment: exports.deleteComment,
    voteRecipe,
};

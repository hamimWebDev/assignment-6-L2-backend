"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const mongoose_1 = require("mongoose");
// Ingredient Schema
const ingredientSchema = new mongoose_1.Schema({
    name: { type: String, required: true }, // Ingredient name
    category: {
        type: String,
        enum: ['Spices', 'Vegetables', 'Meat', 'Dairy', 'Other'], // Allowed ingredient categories
        required: true,
    },
});
// Vote Schema
const voteSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }, // User who voted
    vote: { type: Number, enum: [1, -1], required: true }, // Vote value
});
// Main Recipe Schema
const recipeSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true }, // Recipe title
    description: { type: String, trim: true }, // Recipe description
    ingredients: [ingredientSchema], // Array of ingredients
    instructions: { type: String, required: true }, // Cooking instructions
    images: [{ type: String }], // URLs to images
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }, // Author of the recipe
    isPremium: { type: Boolean, default: false }, // Premium flag
    isDeleted: { type: Boolean, default: false }, // Deleted flag
    isPublished: { type: Boolean, default: true }, // Published flag
    tags: [{ type: String }], // Tags for the recipe
    cookingTime: { type: Number, required: true }, // Cooking time in minutes
    // References for ratings and comments
    ratings: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Rating' }], // References to Rating documents
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment' }], // References to Comment documents
    votes: { type: [voteSchema], default: [] }, // Embedded vote schema
}, { timestamps: true });
// Virtual field for average rating
recipeSchema.virtual('averageRating').get(function () {
    if (!this.ratings || this.ratings.length === 0)
        return 0;
    const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return sum / this.ratings.length;
});
// Virtual field for vote score
recipeSchema.virtual('voteScore').get(function () {
    if (!this.votes || this.votes.length === 0)
        return 0;
    return this.votes.reduce((acc, vote) => acc + vote.vote, 0);
});
// Virtual field for counting ratings
recipeSchema.virtual('ratingCounts').get(function () {
    return this.ratings ? this.ratings.length : 0; // Safeguard for undefined ratings
});
// Virtual field for counting comments
recipeSchema.virtual('commentCounts').get(function () {
    return this.comments ? this.comments.length : 0; // Safeguard for undefined comments
});
// Ensure virtual fields are serialized
recipeSchema.set('toJSON', { virtuals: true });
recipeSchema.set('toObject', { virtuals: true });
// Export Recipe Model
exports.Recipe = (0, mongoose_1.model)('Recipe', recipeSchema);

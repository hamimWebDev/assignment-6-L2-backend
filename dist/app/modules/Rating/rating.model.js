"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
const mongoose_1 = require("mongoose");
// Rating Schema
const ratingSchema = new mongoose_1.Schema({
    recipe: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });
// Export Rating Model
exports.Rating = (0, mongoose_1.model)('Rating', ratingSchema);

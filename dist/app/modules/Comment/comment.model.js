"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
// Comment Schema
const commentSchema = new mongoose_1.Schema({
    recipe: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
}, { timestamps: true });
// Export Comment Model
exports.Comment = (0, mongoose_1.model)('Comment', commentSchema);

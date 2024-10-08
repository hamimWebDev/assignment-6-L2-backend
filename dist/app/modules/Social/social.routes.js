"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const auth_constance_1 = require("../Auth/auth.constance");
const social_controller_1 = require("./social.controller");
const router = express_1.default.Router();
// add rating
router.post('/rating/:recipeId', (0, auth_1.default)(auth_constance_1.USER_ROLE.user), social_controller_1.SocialController.addRating);
// add comment
router.post('/comment/recipes/:recipeId', (0, auth_1.default)(auth_constance_1.USER_ROLE.user, auth_constance_1.USER_ROLE.admin), social_controller_1.SocialController.addComment);
// Update a comment by _id
router.put('/recipes/:recipeId/comment/:commentId', (0, auth_1.default)(auth_constance_1.USER_ROLE.user), social_controller_1.SocialController.updateComment);
// Delete a comment by _id
router.delete('/recipes/:recipeId/comment/:commentId', (0, auth_1.default)(auth_constance_1.USER_ROLE.user), social_controller_1.SocialController.deleteComment);
// Upvote or downvote a recipe
router.post('/recipes/:recipeId/vote', (0, auth_1.default)(auth_constance_1.USER_ROLE.user), social_controller_1.SocialController.vote);
exports.SocialRoutes = router;

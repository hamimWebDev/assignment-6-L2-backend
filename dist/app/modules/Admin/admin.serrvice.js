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
exports.AdminServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_model_1 = require("../Auth/auth.model");
const recipes_model_1 = require("../Recipes/recipes.model");
const blockUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield auth_model_1.User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
    return result;
});
const approvalAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield auth_model_1.User.findByIdAndUpdate(id, { role: 'admin' }, { new: true });
    return result;
});
const unBlockUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield auth_model_1.User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
    return result;
});
const deleteRecipesFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipes_model_1.Recipe.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const publishRecipe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield recipes_model_1.Recipe.findById(id);
    if (!recipe) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Recipe not found');
    }
    const result = yield recipes_model_1.Recipe.findByIdAndUpdate(id, { isPublished: true }, { new: true });
    return result;
});
const unPublishRecipe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield recipes_model_1.Recipe.findById(id);
    if (!recipe) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Recipe not found');
    }
    const result = yield recipes_model_1.Recipe.findByIdAndUpdate(id, { isPublished: false }, { new: true });
    return result;
});
exports.AdminServices = {
    blockUser,
    approvalAdmin,
    unBlockUser,
    publishRecipe,
    unPublishRecipe,
    deleteRecipesFromDb,
};

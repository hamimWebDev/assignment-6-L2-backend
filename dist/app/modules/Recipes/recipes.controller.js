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
exports.RecipeControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsynch_1 = __importDefault(require("../../utils/catchAsynch"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const recipes_service_1 = require("./recipes.service");
const auth_model_1 = require("../Auth/auth.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createRecipe = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Please upload an image!');
    }
    const files = req.files;
    const payload = req.body;
    const result = yield recipes_service_1.RecipeServices.createRecipesIntoDb(payload, files);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Recipe Created Successfully',
        data: result,
    });
}));
const getRecipeById = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId } = req.params;
    const user = req.user;
    const result = yield recipes_service_1.RecipeServices.getRecipeById(user, recipeId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single Recipe retrive Successfully',
        data: result,
    });
}));
const getAllRecipes = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    const query = req.query;
    const user = yield auth_model_1.User.findOne({ email: email, });
    const result = yield recipes_service_1.RecipeServices.getAllRecipes(user, query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Recipe retrive Successfully',
        data: result,
    });
}));
const updateRecipeById = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield recipes_service_1.RecipeServices.updateRecipeById(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Facility updated successfully',
        data: result,
    });
}));
const deleteRecipe = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { recipeId } = req.params;
    const result = yield recipes_service_1.RecipeServices.deleteRecipesFromDb(recipeId, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Recipe Deleted Successfully',
        data: result,
    });
}));
exports.RecipeControllers = {
    createRecipe,
    deleteRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipeById
};

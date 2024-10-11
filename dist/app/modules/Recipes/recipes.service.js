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
exports.RecipeServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_model_1 = require("../Auth/auth.model");
const recipes_model_1 = require("./recipes.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createRecipesIntoDb = (payload, files) => __awaiter(void 0, void 0, void 0, function* () {
    const { file } = files;
    const { author } = payload;
    const user = yield auth_model_1.User.findById(author);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User not found');
    }
    const recipeData = Object.assign(Object.assign({}, payload), { author: author, images: file.map((image) => image.path) });
    const result = yield recipes_model_1.Recipe.create(recipeData);
    return result;
});
const getAllRecipes = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    let baseQuery = recipes_model_1.Recipe.find({ isDeleted: false, isPublished: true });
    // Apply restrictions for non-premium users
    if (!(user === null || user === void 0 ? void 0 : user.isPremium) && (user === null || user === void 0 ? void 0 : user.role) !== 'admin') {
        baseQuery = baseQuery.find({ isPremium: false });
    }
    // Initialize the QueryBuilder with the base query and the user's query parameters
    const queryBuilder = new QueryBuilder_1.default(baseQuery, query);
    // Use QueryBuilder for advanced search, filtering, sorting, and pagination
    const resultQuery = queryBuilder
        .search(['title', 'tags', 'ingredients.name']) // Searchable fields: title, tags, ingredients
        .filter() // Apply filters from query
        .sort() // Apply sorting if any
        .paginate() // Apply pagination
        .fields().modelQuery; // Select specific fields if required // Get the built query
    // Execute the final query
    const recipes = yield resultQuery
        .populate('ratings')
        .populate('comments')
        .populate('author');
    const totalData = yield queryBuilder.countTotal(); // Optional: Get total counts for pagination
    return { recipes, totalData };
});
const getRecipeById = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the recipe by its ID and populate ratings and comments
    const recipe = yield recipes_model_1.Recipe.findById(id)
        .populate('ratings')
        .populate({
        path: 'comments',
    })
        .populate('author')
        .lean();
    // Check if the recipe exists
    if (!recipe) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Recipe not found');
    }
    // Apply restrictions for non-premium users and non-admins
    if (recipe.isPremium && !(user === null || user === void 0 ? void 0 : user.isPremium) && (user === null || user === void 0 ? void 0 : user.role) !== 'admin') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This recipe is only available for premium users');
    }
    // Check if the recipe is deleted
    if (recipe.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This recipe has been deleted');
    }
    // Check if the recipe is published
    if (!recipe.isPublished) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'This recipe is not published');
    }
    // Return the recipe
    return recipe;
});
const updateRecipeById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield recipes_model_1.Recipe.findById(id);
    if (!recipe) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Recipe is not found');
    }
    const result = yield recipes_model_1.Recipe.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteRecipesFromDb = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield auth_model_1.User.findById(user.id);
    if (!currentUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield recipes_model_1.Recipe.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.RecipeServices = {
    createRecipesIntoDb,
    deleteRecipesFromDb,
    getAllRecipes,
    getRecipeById,
    updateRecipeById,
};

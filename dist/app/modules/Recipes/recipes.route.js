"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const recipes_controller_1 = require("./recipes.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const auth_constance_1 = require("../Auth/auth.constance");
const optionalAuth_1 = __importDefault(require("../../middleware/optionalAuth"));
const router = express_1.default.Router();
// create recipe
router.post('/', recipes_controller_1.RecipeControllers.createRecipe);
// getSingle recipe
router.get("/:recipeId", recipes_controller_1.RecipeControllers.getRecipeById);
// update recipe
router.put("/:recipeId", (0, auth_1.default)(auth_constance_1.USER_ROLE.user), recipes_controller_1.RecipeControllers.updateRecipeById);
// get all recipe
router.get("/", (0, optionalAuth_1.default)(auth_constance_1.USER_ROLE.admin, auth_constance_1.USER_ROLE.user), recipes_controller_1.RecipeControllers.getAllRecipes);
// delete recipe
router.delete('/:id', (0, auth_1.default)(auth_constance_1.USER_ROLE.user), recipes_controller_1.RecipeControllers.deleteRecipe);
exports.RecipeRoutes = router;

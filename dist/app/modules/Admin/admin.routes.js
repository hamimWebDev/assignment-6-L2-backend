"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const auth_constance_1 = require("../Auth/auth.constance");
const admin_controllers_1 = require("./admin.controllers");
const router = express_1.default.Router();
// get all user
router.get('/user', (0, auth_1.default)(auth_constance_1.USER_ROLE.admin), admin_controllers_1.AdminControllers.getAllUser);
router.get("/recipe", (0, auth_1.default)(auth_constance_1.USER_ROLE.admin), admin_controllers_1.AdminControllers.getAllRecipe);
// block user
router.put('/block/:id', (0, auth_1.default)(auth_constance_1.USER_ROLE.admin), admin_controllers_1.AdminControllers.blockUser);
// unblock user
router.put('/unblock/:id', (0, auth_1.default)(auth_constance_1.USER_ROLE.admin), admin_controllers_1.AdminControllers.unBlockUser);
// publish recipe
router.put('/publish/:id', (0, auth_1.default)(auth_constance_1.USER_ROLE.admin), admin_controllers_1.AdminControllers.publishRecipe);
// unpublish recipe
router.put('/unpublish/:id', (0, auth_1.default)(auth_constance_1.USER_ROLE.admin), admin_controllers_1.AdminControllers.unPublishRecipe);
// delete recipe
router.delete('recipe/:id', (0, auth_1.default)(auth_constance_1.USER_ROLE.admin), admin_controllers_1.AdminControllers.deleteRecipe);
// delete user
router.delete('/user/:id', (0, auth_1.default)(auth_constance_1.USER_ROLE.admin), admin_controllers_1.AdminControllers.deleteUser);
exports.AdminRoutes = router;

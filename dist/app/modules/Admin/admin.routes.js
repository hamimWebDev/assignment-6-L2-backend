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
// block user
router.post('/block/:id', (0, auth_1.default)(auth_constance_1.USER_ROLE.admin), admin_controllers_1.AdminControllers.blockUser);
// unblock user
router.post('/unblock/:id', (0, auth_1.default)(auth_constance_1.USER_ROLE.admin), admin_controllers_1.AdminControllers.unBlockUser);
// approval admin a user
router.post('/approval/:id', (0, auth_1.default)(auth_constance_1.USER_ROLE.admin), admin_controllers_1.AdminControllers.approvalAdmin);
// publish recipe
router.post('/publish/:id', (0, auth_1.default)(auth_constance_1.USER_ROLE.admin), admin_controllers_1.AdminControllers.publishRecipe);
// unpublish recipe
router.post('/unpublish/:id', (0, auth_1.default)(auth_constance_1.USER_ROLE.admin), admin_controllers_1.AdminControllers.unPublishRecipe);
// delete recipe
router.delete('/:id', (0, auth_1.default)(auth_constance_1.USER_ROLE.admin), admin_controllers_1.AdminControllers.deleteRecipe);
exports.AdminRoutes = router;

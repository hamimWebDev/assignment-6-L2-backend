"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("./user.controllers");
const auth_1 = __importDefault(require("../../middleware/auth"));
const auth_constance_1 = require("../Auth/auth.constance");
const router = express_1.default.Router();
// get user
router.get('/:id', user_controllers_1.UserController.getUser);
// get user with auth
router.get('/', (0, auth_1.default)(auth_constance_1.USER_ROLE.admin, auth_constance_1.USER_ROLE.user), user_controllers_1.UserController.getUserWithAuth);
// update user;
router.put('/update', (0, auth_1.default)(auth_constance_1.USER_ROLE.user), user_controllers_1.UserController.updateUser);
// delete user;
router.delete('/:id', (0, auth_1.default)(auth_constance_1.USER_ROLE.user, auth_constance_1.USER_ROLE.admin), user_controllers_1.UserController.deleteUser);
// Follow a user
router.post('/follow/:userId', (0, auth_1.default)(auth_constance_1.USER_ROLE.user, auth_constance_1.USER_ROLE.admin), user_controllers_1.UserController.followUser);
// unFollow a user
router.post('/unfollow/:userId', (0, auth_1.default)(auth_constance_1.USER_ROLE.user, auth_constance_1.USER_ROLE.admin), user_controllers_1.UserController.unFollowUser);
// get recipes by user
router.get('/recipe/:userId', user_controllers_1.UserController.getAllRecipesbyUserId);
exports.UserRoutes = router;

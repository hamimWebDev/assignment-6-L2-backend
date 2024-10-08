"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const auth_constance_1 = require("./auth.constance");
const router = express_1.default.Router();
// signup user
router.post('/signup', auth_controller_1.AuthControllers.singupUser);
// singin in login
router.post('/login', auth_controller_1.AuthControllers.loginUser);
// chnage password
router.post('/change-password', (0, auth_1.default)(auth_constance_1.USER_ROLE.admin, auth_constance_1.USER_ROLE.user), auth_controller_1.AuthControllers.changePassword);
// refrsh token
router.post('/refresh-token', auth_controller_1.AuthControllers.refreshToken);
router.post('/forget-password', auth_controller_1.AuthControllers.forgetPassword);
router.post('/reset-password', auth_controller_1.AuthControllers.resetPassword);
exports.AuthRoutes = router;

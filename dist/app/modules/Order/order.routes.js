"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const auth_constance_1 = require("../Auth/auth.constance");
const router = express_1.default.Router();
router.post("/confirmation", (0, auth_1.default)(auth_constance_1.USER_ROLE.user), order_controller_1.OrderControllers.createOrder);
exports.OrderRoutes = router;

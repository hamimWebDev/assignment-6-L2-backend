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
exports.orderService = void 0;
const order_model_1 = require("./order.model");
const auth_model_1 = require("../Auth/auth.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const moment_1 = __importDefault(require("moment"));
const payment_utils_1 = require("../payment/payment.utils");
const createOrder = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Find user
    const isUser = yield auth_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email });
    if (!isUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // Check if the user already has an active subscription
    const oldOrder = yield order_model_1.Order.findOne({
        'user.email': (_a = payload === null || payload === void 0 ? void 0 : payload.user) === null || _a === void 0 ? void 0 : _a.email,
        isPremium: true,
        endDate: { $gte: new Date() }, // Check if endDate is greater than or equal to today
    });
    if (oldOrder) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'You already have an active premium package running');
    }
    // Generate a new transaction ID
    const transactionId = `TXN-${Date.now()}`;
    // Prepare the new order data
    const orderData = {
        user: payload.user,
        totalPrice: payload.totalPrice,
        subscriptionDuration: payload.subscriptionDuration,
        startDate: payload.startDate || new Date(), // Default to the current date if not provided
        endDate: payload.endDate ||
            (0, moment_1.default)().add(payload.subscriptionDuration, 'months').toDate(), // Calculate endDate based on subscriptionDuration
        status: payload.status || 'pending',
        transactionId: transactionId,
    };
    // Create the new order
    const order = yield order_model_1.Order.create(orderData);
    const paymentData = {
        transactionId: transactionId,
        totalPrice: payload === null || payload === void 0 ? void 0 : payload.totalPrice,
        custormerName: isUser.name,
        customerEmail: isUser.email,
        customerPhone: isUser.phone,
        customerAddress: 'Bogura, Bangladesh',
        startDate: payload.startDate || new Date(),
        endDate: payload.endDate ||
            (0, moment_1.default)().add(payload === null || payload === void 0 ? void 0 : payload.subscriptionDuration, 'months').toDate(),
    };
    const paymentSeasion = yield (0, payment_utils_1.initiatePayment)(paymentData);
    return paymentSeasion;
});
exports.orderService = {
    createOrder,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const order_constance_1 = require("./order.constance");
const OrderSchema = new mongoose_1.Schema({
    user: {
        name: { type: String, },
        email: { type: String, },
        phone: { type: String, },
        address: { type: String, },
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    subscriptionDuration: {
        type: Number,
        required: true, // Number of months for subscription
    },
    startDate: {
        type: Date,
        default: Date.now, // Defaults to current date
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: Object.values(order_constance_1.Order_Status), // Use constant values
        default: order_constance_1.Order_Status.pending, // Set default value
    },
    paymentStatus: {
        type: String,
        enum: Object.values(order_constance_1.Payment_Status), // Use constant values
        default: order_constance_1.Payment_Status.pending, // Default to pending
    },
    transactionId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});
exports.Order = (0, mongoose_1.model)("Order", OrderSchema);

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
exports.paymentServices = void 0;
/* eslint-disable no-undef */
const path_1 = require("path");
const payment_utils_1 = require("./payment.utils");
const ejs_1 = __importDefault(require("ejs"));
const order_model_1 = require("../Order/order.model");
const order_constance_1 = require("../Order/order.constance");
const auth_model_1 = require("../Auth/auth.model");
const confirmationService = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, payment_utils_1.verifyPayment)(transactionId);
    let paymentData;
    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        const updatedPaymentStatus = yield order_model_1.Order.findOneAndUpdate({ transactionId }, {
            paymentStatus: order_constance_1.Payment_Status.paid,
            status: order_constance_1.Payment_Status.paid
        });
        const orderData = yield order_model_1.Order.findOne({ transactionId });
        const updatedUser = yield auth_model_1.User.findOneAndUpdate({ email: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.cus_email }, {
            isPremium: true,
            subscriptionStartDate: orderData === null || orderData === void 0 ? void 0 : orderData.startDate,
            subscriptionEndDate: orderData === null || orderData === void 0 ? void 0 : orderData.endDate,
        }, { new: true });
        paymentData = {
            consumerName: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.cus_name,
            email: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.cus_email,
            phone: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.cus_phone,
            transactionId: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.mer_txnid,
            amount: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.amount,
            currency: 'BDT',
            payment_type: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.payment_type,
            payTime: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.date,
            paymentStatus: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.pay_status,
        };
    }
    if (paymentData && status === 'success') {
        // const filePathSuccess = join(__dirname, '../../../views/confrimation.ejs')
        const filePathSuccess = (0, path_1.join)(process.cwd(), 'views', 'confrimation.ejs');
        const template = yield ejs_1.default.renderFile(filePathSuccess, paymentData);
        return template;
    }
    else {
        // const filePathFaild = join(__dirname, '../../../views/failded.ejs')
        const filePathFaild = (0, path_1.join)(process.cwd(), 'views', 'failded.ejs');
        const template = yield ejs_1.default.renderFile(filePathFaild, {});
        return template;
    }
});
exports.paymentServices = {
    confirmationService,
};

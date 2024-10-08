"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const sendResponse = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        statusCode: http_status_1.default.OK,
        success: data.success,
        token: data === null || data === void 0 ? void 0 : data.token,
        message: data.message,
        data: data.data,
    });
};
exports.default = sendResponse;

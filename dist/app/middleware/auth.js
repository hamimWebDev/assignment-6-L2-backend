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
const catchAsynch_1 = __importDefault(require("../utils/catchAsynch"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = require("../modules/Auth/auth.model");
const auth = (...requiredRoles) => {
    return (0, catchAsynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers['authorization'];
        if (!token) {
            return next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You have no access to this route'));
        }
        try {
            // Verifying token
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            // Check if user exists
            const { email } = decoded;
            const user = yield auth_model_1.User.isUserExistsByEmail(email);
            if (!user) {
                return next(new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found'));
            }
            // Check if user has required role
            if (requiredRoles.length > 0 &&
                !requiredRoles.includes(decoded.role)) {
                return next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You have no access to this route'));
            }
            // Assign decoded user information to req.user
            req.user = decoded;
            next();
        }
        catch (err) {
            return next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You have no access to this route'));
        }
    }));
};
exports.default = auth;

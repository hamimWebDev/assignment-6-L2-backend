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
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = require("../modules/Auth/auth.model");
const OptionalAuth = (...requiredRoles) => {
    return (0, catchAsynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers['authorization'];
        // If no token is provided, proceed without authentication
        if (!token) {
            req.user = null; // Set req.user to null if no token is provided
            return next(); // Allow the request to continue
        }
        try {
            // Verify the token
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            // Check if user exists
            const { email } = decoded;
            const user = yield auth_model_1.User.isUserExistsByEmail(email);
            if (!user) {
                req.user = null; // Set user to null if not found
                return next(); // Allow the request to continue
            }
            // Assign the user information to req.user
            req.user = decoded; // Attach the user info to the request
            // Check if user has required role if roles are specified
            if (requiredRoles.length > 0 &&
                !requiredRoles.includes(decoded.role)) {
                req.user = null; // Reset user if they don't have the required role
                return next(); // Allow the request to continue
            }
            next(); // Proceed to the next middleware or route handler
        }
        catch (err) {
            req.user = null; // Set user to null if token verification fails
            return next(); // Allow the request to continue
        }
    }));
};
exports.default = OptionalAuth;

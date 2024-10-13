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
exports.AdminControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsynch_1 = __importDefault(require("../../utils/catchAsynch"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const admin_serrvice_1 = require("./admin.serrvice");
// get all user from db
const getAllUser = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_serrvice_1.AdminServices.getAllUsrFromDb();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User Retrive Successfully',
        data: result,
    });
}));
// get all user from db
const getAllRecipe = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_serrvice_1.AdminServices.getAllRecipeFromDb();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Recipe Retrive Successfully',
        data: result,
    });
}));
const blockUser = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_serrvice_1.AdminServices.blockUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User Blocked Successfully',
        data: result,
    });
}));
const unBlockUser = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_serrvice_1.AdminServices.unBlockUsers(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User UnBlocked Successfully',
        data: result,
    });
}));
const publishRecipe = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_serrvice_1.AdminServices.publishRecipe(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Recipe Published Successfully',
        data: result,
    });
}));
const unPublishRecipe = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_serrvice_1.AdminServices.unPublishRecipe(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Recipe unPublished Successfully',
        data: result,
    });
}));
const deleteRecipe = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_serrvice_1.AdminServices.deleteRecipesFromDb(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Recipe deleted Successfully',
        data: result,
    });
}));
const deleteUser = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_serrvice_1.AdminServices.deleteUserFromDb(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User deleted Successfully',
        data: result,
    });
}));
exports.AdminControllers = {
    blockUser,
    unBlockUser,
    publishRecipe,
    unPublishRecipe,
    deleteRecipe,
    getAllUser,
    deleteUser,
    getAllRecipe
};

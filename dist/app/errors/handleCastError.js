"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (err) => {
    const errorSources = [
        {
            path: err.path,
            message: err.message
        }
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: err.message,
        errorSources
    };
};
exports.handleCastError = handleCastError;

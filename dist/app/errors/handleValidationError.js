"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    const errorSources = [
        {
            path: "",
            "message": err.message
        }
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: err.message,
        errorSources,
    };
};
exports.handleValidationError = handleValidationError;

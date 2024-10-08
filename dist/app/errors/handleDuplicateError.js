"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const handleDuplicateError = (err) => {
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
        errorSources
    };
};
exports.handleDuplicateError = handleDuplicateError;

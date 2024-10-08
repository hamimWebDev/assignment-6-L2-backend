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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const globalErrorHandlers_1 = __importDefault(require("./app/middleware/globalErrorHandlers"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// cors configuration
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
// Serve static files from the 'build' directory
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "build")));
// app.set("views", path.join(__dirname, "..", "./views")); // Ensure this points to your views folder
app.set("view engine", "ejs"); // Set EJS as the view engine
// Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));
// application routes
app.use("/api", routes_1.default);
// Test route
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = 'Recipe Circle server is running';
    res.send(message);
}));
// Catch-all route for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'build', 'index.html'));
});
// global error handler
app.use(globalErrorHandlers_1.default);
// not found route
app.use(notFound_1.default);
exports.default = app;

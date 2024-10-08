"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRETE,
    jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRETE,
    jwt_refrsh_expire_in: process.env.JWT_REFRESh_EXPIRE_IN,
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    payment_url: process.env.PAYMENT_URL,
    payment_verify_url: process.env.PAYMENT_VERIFY_URL,
    reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
    nodemailer_user_email: process.env.NODEMAILER_USER_EMAIL,
    nodemailer_user_app_pass: process.env.NODEMAILER__USER_APP_PASSWORD,
    nodemailer_sender_email_address: process.env.NODEMAILER__SENDER_EMAIL_ADDRESS,
};

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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId, // Default MongoDB _id
        auto: true, // Automatically generate an ObjectId
    },
    id: {
        type: String,
        required: true,
        unique: true, // Ensure this is unique if necessary
        default: () => new mongoose_1.Types.ObjectId().toString(), // Generate a new unique id (or you can customize this)
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Trim whitespace
        lowercase: true, // Convert to lowercase for consistency
    },
    password: {
        type: String,
        required: true,
        select: false, // Set select to false to exclude it from query results by default
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user', // Default role can be user
    },
    followers: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'User',
        }],
    following: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'User',
        }],
    phone: {
        type: String,
        required: true,
        unique: true, // Ensure unique phone numbers if applicable
    },
    profilePicture: {
        type: String,
    },
    isPremium: {
        type: Boolean,
        required: true,
        default: false,
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensure unique usernames
    },
    bio: {
        type: String,
        maxlength: 160, // Limit bio length if necessary
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    passwordChangedAt: {
        type: Date,
    },
    subscriptionStartDate: {
        type: Date
    },
    subscriptionEndDate: {
        type: Date
    }
}, {
    timestamps: true,
    versionKey: false,
});
// Hash password before saving the user
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // Only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) {
            return next();
        }
        try {
            user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
            next();
        }
        catch (error) {
            return next(error); // Handle errors if hashing fails
        }
    });
});
// Method to find user by email
userSchema.statics.isUserExistsByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findOne({ email }).select('+password'); // Always include password for comparison
    });
};
// Set password to an empty string after saving for security
userSchema.post('save', function (doc, next) {
    doc.password = ''; // Clear password after saving
    next();
});
// Method to compare password during login
userSchema.statics.isUserPasswordMatch = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (passwordChangedTimestamp, jwtIssuedTimestamp) {
    const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};
// Export the user model
exports.User = (0, mongoose_1.model)('User', userSchema);

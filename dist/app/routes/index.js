"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const user_route_1 = require("../modules/Users/user.route");
const recipes_route_1 = require("../modules/Recipes/recipes.route");
const admin_routes_1 = require("../modules/Admin/admin.routes");
const social_routes_1 = require("../modules/Social/social.routes");
const paument_routes_1 = require("../modules/payment/paument.routes");
const order_routes_1 = require("../modules/Order/order.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/recipe",
        route: recipes_route_1.RecipeRoutes,
    },
    {
        path: "/admin",
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: "/social",
        route: social_routes_1.SocialRoutes,
    },
    {
        path: "/payment",
        route: paument_routes_1.PaymentRoutes,
    },
    {
        path: "/order",
        route: order_routes_1.OrderRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

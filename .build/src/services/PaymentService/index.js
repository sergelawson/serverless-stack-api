"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stripe_1 = require("stripe");
var PaymentService_1 = require("./PaymentService");
var apiKey = process.env.stripeSecretKey;
var stripeService = new stripe_1.default(apiKey, {
    apiVersion: "2022-11-15",
});
var paymentService = new PaymentService_1.default(stripeService);
exports.default = paymentService;
//# sourceMappingURL=index.js.map
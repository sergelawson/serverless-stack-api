"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCost = void 0;
function calculateCost(storage) {
    var rate = storage <= 10 ? 4 : storage <= 100 ? 2 : 1;
    return rate * storage * 100;
}
exports.calculateCost = calculateCost;
//# sourceMappingURL=billing-lib.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = catalogoRoutes;
var express_1 = require("express");
function catalogoRoutes(controller) {
    var router = (0, express_1.Router)();
    router.get('/', controller.listCatalogo.bind(controller));
    return router;
}

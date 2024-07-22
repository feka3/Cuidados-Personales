"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _1 = __importDefault(require("./"));
const indexRouter = (0, express_1.Router)();
indexRouter.use("/users", _1.default);
exports.default = indexRouter;

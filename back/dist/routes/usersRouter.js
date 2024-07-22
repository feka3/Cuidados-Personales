"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', (req, res) => {
    res.send('Obtener listado de todos los usuarios');
});
usersRouter.post('/register', (req, res) => {
    res.send('Registro de un nuevo usuario');
});
usersRouter.post('/login', (req, res) => {
    res.send('Login del usuario a la aplicación');
});
exports.default = usersRouter;

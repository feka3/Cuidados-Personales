"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turnsRouter = (0, express_1.Router)();
turnsRouter.get('/', (req, res) => {
    res.send('Obtener listado de todos los usuarios');
});
turnsRouter.post('/register', (req, res) => {
    res.send('Registro de un nuevo usuario');
});
turnsRouter.put('/login', (req, res) => {
    res.send('Login del usuario a la aplicación');
});

import { Router } from "express";
import { createService, getServices } from "../../controllers/service/servicesController";
// import { getUsers, createUser, loginUser, getUserById } from "../../controllers/user/usersController";

const serviceRouter: Router = Router();

serviceRouter.get('/', getServices)

// serviceRouter.get('/:id', () => { })

serviceRouter.post('/register', createService)

// serviceRouter.put('/login', () => { })

// serviceRouter.patch('/login', () => { })

export default serviceRouter;
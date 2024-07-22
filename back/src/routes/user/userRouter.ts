import { Router } from "express";
import { getUsers, createUser, loginUser, getUserById } from "../../controllers/user/usersController";
import { validateRegistration } from "../../middlewares/validateRegistration";

const usersRouter: Router = Router();

usersRouter.get('/', getUsers)

usersRouter.get('/:id', getUserById)

usersRouter.post('/register', validateRegistration, createUser)

usersRouter.post('/login', loginUser)

export default usersRouter;
import { Request, Response } from "express";
import { createUserService, loginUserService, getUserByIdService, getUsersService } from "../../services/usersService";
import { User } from "../../entities/User";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users: User[] = await getUsersService();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newUser: User = await getUserByIdService(Number(id));
        res.status(200).json(newUser);
    } catch (error: any) {
        res.status(404).json("Error: " + error);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, birthdate, nDni, credentials: credentialDto } = req.body;
        const newUser: User = await createUserService({ name, email, birthdate, nDni, credentials: credentialDto, });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const user = await loginUserService(username, password);
        if (user) {
            res.status(200).json({ login: true, user });
        } else {
            res.status(400).json({ login: false, error: "Datos incorrectos" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
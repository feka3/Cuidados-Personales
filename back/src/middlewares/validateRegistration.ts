import { Request, Response, NextFunction } from 'express';
import { checkIfUsernameExists, checkIfEmailExists } from '../services/user/userValidationService';
import { log } from 'console';

export const validateRegistration = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, credentials: { username } } = req.body;

    // Verificar si el nombre de usuario ya existe
    const usernameExists = await checkIfUsernameExists(username);
    if (usernameExists) {
        return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }

    // Verificar si el correo electrónico ya existe
    const emailExists = await checkIfEmailExists(email);
    log(emailExists);
    if (emailExists) {
        return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
    }

    // Validar otros datos del usuario aquí si es necesario...

    // Si todo está bien, pasa al siguiente middleware
    next();
};

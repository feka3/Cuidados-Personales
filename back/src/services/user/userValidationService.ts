// userValidationService.ts

import CredentialRepository from '../../repositories/CredentialRepository';
import UserRepository from '../../repositories/UserRepository';

export const checkIfUsernameExists = async (username: string): Promise<boolean> => {
    try {
        const existingUser = await CredentialRepository.findOneBy({ username });
        return !!existingUser; // Devuelve true si existe un usuario con el nombre de usuario dado
    } catch (error) {
        throw new Error('Error al verificar el nombre de usuario');
    }
};

export const checkIfEmailExists = async (email: string): Promise<boolean> => {
    try {
        const existingUser = await UserRepository.findOneBy({ email });
        return !!existingUser; // Devuelve true si existe un usuario con el correo electrónico dado
    } catch (error) {
        throw new Error('Error al verificar el correo electrónico');
    }
};

export const checkIfNameExists = async (name: string): Promise<boolean> => {
    try {
        const existingUser = await UserRepository.findOneBy({ name });
        return !!existingUser; // Devuelve true si existe un usuario con el correo electrónico dado
    } catch (error) {
        throw new Error('Error al verificar el nombre');
    }
};
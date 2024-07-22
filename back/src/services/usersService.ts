import UserDto from "../dtos/UserDto";
import { User } from "../entities/User";
import { createCredentialsService, checkCredentialsService } from "./credentialsService";
import UserRepository from "../repositories/UserRepository";
import CredentialRepository from "../repositories/CredentialRepository";
// import { AppDataSource } from "../config/data-source";
import { comparePassword } from "../utils";

export const getUsersService = async () => {
    try {
        const users = await UserRepository.find({
            relations: {
                appointments: true,
            }
        });

        return users;
    } catch (error: any) {
        throw new Error("Error getting users")
    }
};

export const getUserByIdService = async (id: number): Promise<User> => {
    try {
        const user = await UserRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.appointments", "appointments")
            .leftJoinAndSelect("appointments.service", "service") // Vincula el servicio a las citas

            .where("user.id = :id", { id })
            .getOne();

        if (user) {
            return user;
        } else {
            throw new Error("User not found")
        }
    } catch (error: any) {
        throw error.message
    }
};

export const createUserService = async (userData: UserDto): Promise<User> => {

    try {
        const credentialsId = await createCredentialsService({ username: userData.credentials.username, password: userData.credentials.password });
        const user = await UserRepository.create(userData);
        const credential = await CredentialRepository.findOneBy({
            id: credentialsId
        })

        if (credential) {
            user.credentials = credential;
            const result = await UserRepository.save(user);

            return result;
        } else {
            throw new Error("Credentials not found")
        }

    } catch (error: any) {
        throw error.message
    }
}

export const loginUserService = async (username: string, password: string): Promise<User | null> => {
    try {
        // Buscar las credenciales por el nombre de usuario
        const credential = await CredentialRepository.findOneBy({ username });

        if (!credential) {
            throw new Error("Usuario no encontrado");
        }

        // Comparar la contraseña proporcionada con la contraseña almacenada
        const isPasswordValid = comparePassword(password, credential.password);

        if (isPasswordValid) {
            // Si la contraseña es válida, buscar y devolver al usuario
            const user = await UserRepository.findOne({
                where: { credentials: { username } },
                relations: ["credentials"]
            });
            return user || null;
        } else {
            throw new Error("Credenciales inválidas");
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};

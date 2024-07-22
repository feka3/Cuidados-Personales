import { AppDataSource } from "../config/data-source";
import CredentialDto from "../dtos/CredentialDto";
import { Credential } from "../entities/Credential";
import ICredential from "../interfaces/ICredential";
import CredentialRepository from "../repositories/CredentialRepository";
import { encryptedPassword, comparePassword } from "../utils/";

export const createCredentialsService = async ({ username, password }: CredentialDto): Promise<number | undefined> => {
    try {
        const hashedPassword: string = encryptedPassword(password);

        const credential = await AppDataSource.manager.create(Credential, {
            username,
            password: hashedPassword
        });
        const result = await CredentialRepository.save(credential);

        return result.id;
    } catch (error: any) {
        throw new Error("Error creating credentials")
    }
};

export const checkCredentialsService = async (username: string, password: string) => {
    try {
        // const credential = credentials.find(cred => cred.username === username);
        const credential = await CredentialRepository.findOneBy({ username });
        if (!credential) { return "Usuario no encontrado"; }
        if (comparePassword(password, credential.password)) {
            return credential.id;
        } else {
            return null;
        }

    } catch (error: any) {
        throw new Error(error.message);
    }
}

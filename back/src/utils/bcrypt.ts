import bcrypt from 'bcrypt';

function encryptedPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
}

export {
    encryptedPassword,
    comparePassword
}
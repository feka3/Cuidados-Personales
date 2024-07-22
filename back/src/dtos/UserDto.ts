import CredentialDto from "./CredentialDto"

interface UserDto {
    name: string
    email: string
    birthdate: Date
    nDni: number
    credentials: CredentialDto
}

export default UserDto
import { IAppointment } from "./IAppointment";

export default interface IUser {
    id: number
    name: string
    email: string
    birthdate: Date
    nDni: number
    credentialsId: number
    appointments: number
}

import { Service } from "../entities/Service"
import { User } from "../entities/User"

interface AppointmentDto {
    date: Date
    time: string
    userId: number
    serviceId: number
}

export default AppointmentDto
export enum Status {
    ACTIVE = "ACTIVE",
    CANCELED = "CANCELED",
}
export interface IAppointment {
    // id: number
    date: Date
    time: string
    status: Status
    userId: number
    serviceId: number
}


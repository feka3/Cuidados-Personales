import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Credential } from "../entities/Credential"
import { Appointment } from "../entities/Appointment"
import { Service } from "../entities/Service"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "feK205673",
    database: "llcuidadospersonales",
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Credential, Appointment, Service],
    subscribers: [],
    migrations: [],
})

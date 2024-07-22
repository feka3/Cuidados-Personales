import { AppDataSource } from "../config/data-source";
import AppointmentDto from "../dtos/AppointmentDto";
import ServiceDto from "../dtos/ServiceDto";
import UserDto from "../dtos/UserDto";
import { Appointment } from "../entities/Appointment";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import { IAppointment, Status } from "../interfaces/IAppointment";
import AppointmentRepository from "../repositories/AppointmentRepository";
import ServiceRepository from "../repositories/ServiceRepository";
import { encryptedPassword } from "../utils";

const preloadUsers: UserDto[] = [
    {
        name: "Facundo Arriola",
        email: "arriola@gmail.com",
        birthdate: new Date(2000, 4, 1),
        nDni: 40473455,
        credentials: {
            username: "facundo01",
            password: "facundo01"
        }
    },
    {
        name: "Carlos Lopez",
        email: "lopez@gmail.com",
        birthdate: new Date(1977, 3, 6),
        nDni: 18943854,
        credentials: {
            username: "carlos01",
            password: "carlos01"
        }
    },
    {
        name: "Luisa Perez",
        email: "perez@gmail.com",
        birthdate: new Date(1966, 8, 4),
        nDni: 18943311,
        credentials: {
            username: "luisa01",
            password: "luisa01"
        }
    },
    {
        name: "Julio Azteca",
        email: "azteca@gmail.com",
        birthdate: new Date(1973, 7, 5),
        nDni: 18943100,
        credentials: {
            username: "julio01",
            password: "julio01"
        }
    },
    {
        name: "Pepito Perez",
        email: "perez@gmail.com",
        birthdate: new Date(1973, 7, 5),
        nDni: 18943100,
        credentials: {
            username: "pepito01",
            password: "pepito01"
        }
    }
];

const preloadServices: ServiceDto[] = [
    {
        name: "Masajes relajantes",
        description: "Servicio de masaje relajante",
        place: "CasaFit",
        price: 6000,
        available: true
    },
    {
        name: "Podologia",
        description: "Servicio de podologia",
        place: "CasaFit",
        price: 6000,
        available: true
    },
    {
        name: "Limpieza Facial",
        description: "Servicio de limpieza facial",
        place: "CasaFit",
        price: 5000,
        available: true
    }
];

const preloadAppointments: IAppointment[] = [
    {
        date: new Date(2023, 4, 29),
        time: "15:00",
        userId: 1,
        serviceId: 3,
        status: Status.CANCELED
    },
    {
        date: new Date(2023, 8, 16),
        time: "10:00",
        userId: 2,
        serviceId: 1,
        status: Status.CANCELED
    },
    {
        date: new Date(2023, 3, 18),
        time: "11:00",
        userId: 3,
        serviceId: 2,
        status: Status.CANCELED
    },
    {
        date: new Date(2023, 4, 14),
        time: "15:00",
        userId: 3,
        serviceId: 3,
        status: Status.CANCELED
    },
    {
        date: new Date(2023, 8, 30),
        time: "10:00",
        userId: 5,
        serviceId: 1,
        status: Status.CANCELED
    }
];


export const preloadServiceData = async () => {
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
        for await (const service of preloadServices) {
            const newService = await ServiceRepository.create(service);
            try {
                await transactionalEntityManager.save(newService);
            } catch (error: any) {
                error.message
            }
        }
    })
}

export const preloadUserData = async () => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const promise = preloadUsers.map(async (user) => {
        try {
            const hashedPassword = encryptedPassword(user.credentials.password);
            const newCredential: Credential = await queryRunner.manager.create(Credential, {
                ...user.credentials,
                password: hashedPassword
            });
            await queryRunner.manager.save(newCredential);

            const newUser = await queryRunner.manager.create(User, {
                ...user,
                credentials: newCredential
            });
            await queryRunner.manager.save(newUser);
        } catch (error: any) {
            console.log("Error en la precarga de usuarios:", error.message);
            throw error; // Propagar el error para que la transacción se revierta
        }
    });
    try {
        await queryRunner.startTransaction();
        await Promise.all(promise);
        console.log("precarga de usuarios realizada con exito");
        await queryRunner.commitTransaction();
    } catch (error: any) {
        console.log("Error en la precarga de usuarios");
        await queryRunner.rollbackTransaction();
    } finally {
        console.log("precarga de usuarios finalizada");
        await queryRunner.release();
    }
}

export const preloadAppointmentData = async () => {
    // const queryRunner = AppDataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // const promise = preloadAppointments.map(async (appointment) => {
    //     try {
    //         const newAppointment = await queryRunner.manager.create(Appointment, {
    //             ...appointment,
    //             user: { id: appointment.userId },
    //             service: { id: appointment.serviceId }
    //         });
    //         console.log(newAppointment);

    //         await queryRunner.manager.save(newAppointment);
    //     } catch (error: any) {
    //         console.log("Error en la precarga de citas:", error.message);
    //         throw error; // Propagar el error para que la transacción se revierta
    //     }
    // }

    // );
    // try {
    //     await queryRunner.startTransaction();
    //     await Promise.all(promise);
    //     console.log("precarga de appointments realizada con exito");
    //     await queryRunner.commitTransaction();
    // } catch (error: any) {
    //     console.log("Error en la precarga de appointments realizada");
    //     await queryRunner.rollbackTransaction();
    // } finally {
    //     console.log("precarga de appointments finalizada");
    //     await queryRunner.release();
    // }

    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
        for await (const appointment of preloadAppointments) {
            const newAppointment = await AppointmentRepository.create({
                ...appointment,
                user: { id: appointment.userId },
                service: { id: appointment.serviceId },
            });
            try {
                await transactionalEntityManager.save(newAppointment);
            } catch (error: any) {
                error.message
            }
        }
    })
}
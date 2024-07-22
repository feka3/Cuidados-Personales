import AppointmentDto from "../dtos/AppointmentDto";
import { IAppointment, Status } from "../interfaces/IAppointment";
import { Appointment } from "../entities/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";
import ServiceRepository from "../repositories/ServiceRepository";


export const getAppointmentsService = async () => {
    try {
        const appointment = await AppointmentRepository.find(
            {
                relations: {
                    user: true,
                    service: true,
                }
            }
        );
        return appointment
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
    try {
        const appointment = await AppointmentRepository.findOneBy({ id });
        if (appointment) {
            return appointment;
        } else {
            throw new Error(`No se encontró ningún turno con el ID`);
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const sheduleAppointmentService = async (appointmentData: AppointmentDto): Promise<Appointment> => {
    try {
        const user = await UserRepository.findOneBy({ id: appointmentData.userId });
        const service = await ServiceRepository.findOneBy({ id: appointmentData.serviceId });

        if (!user || !service) {
            throw new Error("User or service not found");
        }

        const newAppointment = await AppointmentRepository.create({
            ...appointmentData,
            user,
            service
        });
        return await AppointmentRepository.save(newAppointment);

    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const cancelAppointmentService = async (id: number) => {
    try {
        const appointmentIndex = await AppointmentRepository.findOneBy({ id });

        if (appointmentIndex) {
            const appointment = await AppointmentRepository.update({ id }, { status: Status.CANCELED })
            return appointment

        } else {
            throw new Error(`No se encontro un turno con id ${id}`)
        }

    } catch (error: any) {
        throw new Error(error.message)
    }
}
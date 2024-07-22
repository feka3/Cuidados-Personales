import { Request, Response } from "express";
import { getAppointmentsService, getAppointmentByIdService, sheduleAppointmentService, cancelAppointmentService } from "../../services/appointmentsService";
import AppointmentDto from "../../dtos/AppointmentDto";
import { Appointment } from "../../entities/Appointment";

export const getAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await getAppointmentsService();
        res.status(200).json(appointments);
    } catch (error: any) {
        res.status(400).json("Error: " + error.message)
    }
};

export const getAppointmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const appointment = await getAppointmentByIdService(Number(id));
        res.status(200).json(appointment);
    } catch (error: any) {
        res.status(500).json("Error: " + error.message)
    }
};

export const sheduleAppointment = async (req: Request, res: Response) => {
    try {
        const { date, time, userId, serviceId } = req.body;
        const newAppointment: Appointment = await sheduleAppointmentService({ date, time, userId, serviceId });
        res.status(200).json(newAppointment);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const cancelAppointment = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        await cancelAppointmentService(Number(id));
        res.status(200).json(`Turno cancelado con exito`);
    } catch (error: any) {
        res.status(500).json("Error: " + error.message)
    }
};
import { Request, Response } from "express";
import { getServicesService, createServiceService } from "../../services/serviceService";
import { Service } from "../../entities/Service";

export const getServices = async (req: Request, res: Response) => {
    try {
        const services = await getServicesService();
        res.status(200).json(services);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// export const getAppointment = async (req: Request, res: Response) => {
//     res.send('Obtener un turno especifico');
// };

export const createService = async (req: Request, res: Response) => {
    try {
        const { name, description, place, price, available } = req.body;
        const newService: Service = await createServiceService({ name, description, place, price, available });
        res.status(201).json(newService);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }

};

// export const cancelAppointment = async (req: Request, res: Response) => {
//     res.send('Turno cancelado');
// };
// appointmentValidationMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const validateAppointmentData = (req: Request, res: Response, next: NextFunction) => {
    const { date, time, userId, serviceId } = req.body;

    if (!date || !time || !userId || !serviceId) {
        return res.status(400).json({ error: 'Missing data in request' });
    }

    // Puedes agregar más validaciones según sea necesario

    next(); // Llama a next() para pasar al siguiente middleware o controlador
};

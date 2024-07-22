import { Router } from "express";
import { getAppointments, getAppointmentById, sheduleAppointment, cancelAppointment } from "../../controllers/appointment/appointmentsController";
import { validateAppointmentData } from "../../middlewares/validateAppointment";

const appointmentRouter: Router = Router();

appointmentRouter.get('/', getAppointments)

appointmentRouter.get('/:id', getAppointmentById)

appointmentRouter.post('/schedule', validateAppointmentData, sheduleAppointment)

appointmentRouter.put('/cancel', cancelAppointment)

export default appointmentRouter;
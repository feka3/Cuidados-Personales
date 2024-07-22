import { Router } from "express";
import { Request, Response } from "express";
import userRouter from "./user/userRouter";
import appointmentRouter from "./appointment/appointmentRouter";
import serviceRouter from "./service/serviceRouter";



const indexRouter: Router = Router();

indexRouter.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
})

indexRouter.use("/users", userRouter)

indexRouter.use("/appointments", appointmentRouter)

indexRouter.use("/services", serviceRouter)

export default indexRouter;
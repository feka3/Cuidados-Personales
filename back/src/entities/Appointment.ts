import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../interfaces/IAppointment";
import { User } from "./User";
import { Service } from "./Service";

@Entity("appointments")
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date" })
    date: Date;

    @Column({ type: "time" })
    time: string;

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    status: Status;

    @ManyToOne(() => User, (user) => user.appointments)
    user: User

    @ManyToOne(() => Service)
    service: Service
}

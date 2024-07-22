import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credential } from "./Credential";
import { Appointment } from "./Appointment";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50 })
    name: string;

    @Column({ type: "varchar", length: 50, })
    email: string;

    @Column()
    birthdate: Date;

    @Column({ type: "int" })
    nDni: number;

    @OneToMany(() => Appointment, appointment => appointment.user)
    @JoinColumn()
    appointments: Appointment[]

    @OneToOne(() => Credential)
    @JoinColumn()
    credentials: Credential
}

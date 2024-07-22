import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("services")
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    place: string;

    @Column()
    price: number;

    @Column()
    available: boolean;
}

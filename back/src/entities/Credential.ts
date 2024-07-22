import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("credentials")
export class Credential {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, })
    username: string;

    @Column()
    password: string;
}


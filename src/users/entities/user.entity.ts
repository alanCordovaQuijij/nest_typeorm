import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true, default: null })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({default: 'user' })
    rol: string;

    @Column({ default: () => 'NOW()' })
    createdAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @Column({ nullable: true, default: null })
    autoStrategy: string;
}

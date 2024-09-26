import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('Visits')
export class Visit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('datetime')
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    page: string;

    @Column()
    ipAddress: string;

    @Column()
    language: string;

    @Column()
    browser: string;

    @Column({ nullable: true })
    referer: string;

    @Column({ default: false })
    removed: boolean;
}
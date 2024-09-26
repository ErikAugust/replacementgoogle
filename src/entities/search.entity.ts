import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('Searches')
export class Search extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('datetime')
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    search: string;

    @Column()
    answer: string;

    @Column({ default: false })
    lucky: boolean;

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

    @Column({ default: false })
    featured: boolean;
}
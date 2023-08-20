import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { instanceToPlain, Exclude } from 'class-transformer';
import { Role } from './Role';

import * as bcrypt from 'bcryptjs';
import { CoreEntity } from './core/CoreEntity';
import { Property } from './Property';
import { Booking } from "./Booking";


@Entity()
export class User extends CoreEntity {
    @Column({
        unique: true,
        nullable: false,
    })
    email: string;

    @Exclude({toPlainOnly: true})
    @Column({
        nullable: false,
    })
    password: string;

    @Column({
        nullable: false,
    })
    firstName: string;

    @Column({
        nullable: false,
    })
    lastName: string;

    @ManyToOne(() => Role, { eager: true })
    role: Role;

    @OneToMany(() => Property, (property) => property.user, {onDelete: 'CASCADE', cascade:true})
    properties: Property[];

    @OneToMany(() => Booking, (booking) => booking.user, {onDelete: 'CASCADE', cascade:true})
    bookings: Booking[];

    @BeforeInsert()
    async passwordToHash() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    /**
     * Overrides toJson() in order to make use of the Exclude() annotation used on the 'password' field
     */
    toJSON() {
        return instanceToPlain(this);
    }
}

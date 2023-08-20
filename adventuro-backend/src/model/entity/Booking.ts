import {Column, Entity, ManyToOne} from 'typeorm';
import { CoreEntity } from './core/CoreEntity';
import { Property } from "./Property";
import { User } from "./User";

@Entity()
export class Booking extends CoreEntity {
    @Column({
        nullable: false,
    })
    startDate: Date;

    @Column({
        nullable: false,
    })
    endDate: Date;

    @Column({
        nullable: false,
        default: true
    })
    isConfirmed: boolean;

    @ManyToOne(() => Property, (property) => property.bookings, {onDelete: 'CASCADE'})
    property: Property;

    @ManyToOne(() => User, (user) => user.bookings, {onDelete: 'CASCADE'})
    user: User;


}

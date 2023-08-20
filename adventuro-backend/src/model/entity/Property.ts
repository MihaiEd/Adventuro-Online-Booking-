import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from './User';
import { CoreEntity } from './core/CoreEntity';
import { Price } from './Price';
import { PropertyTypeEnum } from '../enum/PropertyTypeEnum';
import { Booking } from './Booking';
import { Address } from './Address';

@Entity()
export class Property extends CoreEntity {
    @Column({
        nullable: false,
    })
    type: PropertyTypeEnum;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    hasBreakfast: boolean;

    @Column({
        nullable: true
    })
    hasAirConditioning: boolean;

    @Column({
        nullable: true
    })
    hasHeating: boolean;

    @Column({
        nullable: false,
    })
    description: string;

    @Column({
        nullable: false,
    })
    image: string;

    @OneToOne(() => Address, (address) => address.property, { cascade: true })
    address: Address;

    @OneToOne(() => Price, (price) => price.property, { cascade: true })
    price: Price;

    @ManyToOne(() => User, (user) => user.properties)
    user: User;

    @OneToMany(() => Booking, (booking) => booking.property, { onDelete: 'CASCADE', cascade:true })
    bookings: Booking[];
}

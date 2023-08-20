import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CoreEntity } from './core/CoreEntity';
import { Property } from './Property';

@Entity()
export class Address extends CoreEntity {
  @Column({
    nullable: false,
    default: true
  })
  country: string;

  @Column({
    nullable: false,
    default: true

  })
  city: string;

  @Column({
    nullable: false,
  })
  county: string;

  @Column({
    nullable: false,
  })
  addressLine1: string;

  @Column({
    nullable: false,
  })
  postalCode: number;

  @OneToOne(() => Property, (property) => property.address, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn()
  property: Property
}

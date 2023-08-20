import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CoreEntity } from './core/CoreEntity';
import { PriceEnum } from '../enum/PriceEnum';
import { Property } from './Property';

@Entity()
export class Price extends CoreEntity {
  @Column({
    nullable: false,
  })
  value: number;

  @Column({
    nullable: false,
  })
  currency: PriceEnum;

  @OneToOne(() => Property, (property) => property.price, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  property: Property
}

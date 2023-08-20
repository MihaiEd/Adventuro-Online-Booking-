import { CoreEntity } from './core/CoreEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Role extends CoreEntity {
    @Column({
        unique: true,
        nullable: false,
    })
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }
}

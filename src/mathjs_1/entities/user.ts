import  { Entity, PrimaryColumn, Column, Index } from 'typeorm'


@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column({type: 'varchar', length: 30})
    @Index({unique: true})
    name: string;

    @Column({type: 'varchar', length: 255, default: null, nullable: true})
    email: string;

    // @OneToOne(() => Profile)
    // profile: Profile;
}

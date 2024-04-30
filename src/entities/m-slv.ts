import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('m_slv', { schema: 'cmd_owner' })
export class MSLVEntity extends BaseModel {
  @Column('varchar', { name: 'sleeve_name' })
  sleeveName: string | null;

  @Column('int4', { name: 'start_cycle' })
  startCycle: number;

  @Column('int4', { name: 'end_cycle' })
  endCycle: number;

  @Column('int4', { name: 'stts_ind', default: 1 })
  sttsInd: number;

  @Column('int4', { name: 'star_id' })
  starId: number;

  @Column({ name: 'is_invntd', default: false })
  isInvntd?: boolean;

  constructor(model?: any) {
    super();
    Object.assign(this, model);
  }
}

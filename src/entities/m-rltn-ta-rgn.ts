import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('m_rltn_ta_rgn', { schema: 'cmd_owner' })
export class MRltnTaRegionEntity extends BaseModel {
  @Column('int4', { name: 'year_month' })
  yearMonth: number;

  @Column('varchar', { name: 'rgn_gk', length: 100 })
  rgnGk: string;

  @Column('int4', { name: 'ta_id' })
  taId: number;

  @Column('int4', { name: 'stts_ind', default: 1 })
  sttsInd: number;

  constructor(model?: any) {
    super();
    Object.assign(this, model);
  }
}

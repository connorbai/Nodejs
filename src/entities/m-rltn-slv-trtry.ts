import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('m_rltn_slv_trtry', { schema: 'cmd_owner' })
export class MRltnSlvTrtryEntity extends BaseModel {
  @Column('int4', { name: 'sleeve_id' })
  sleeveId: number;

  @Column('int4', { name: 'cycle' })
  cycle: number;

  @Column('varchar', { name: 'trtry_cd' })
  trtryCd: string;

  @Column('int4', { name: 'stts_ind', default: 1 })
  sttsInd: number;

  constructor(model?: any) {
    super();
    Object.assign(this, model);
  }
}

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('m_rltn_slv_ctgry', { schema: 'cmd_owner' })
export class MRltnSlvCtgryEntity extends BaseModel {
  @Column('int4', { name: 'sleeve_id' })
  sleeveId: number;

  @Column('int4', { name: 'prdct_ctgry_id' })
  prdctCtgryId: number;

  @Column('int4', { name: 'star_prdct_ctgry_id' })
  starPrdctCtgryId: number;

  @Column('int4', { name: 'stts_ind', default: 1 })
  sttsInd: number;

  constructor(model?: any) {
    super();
    Object.assign(this, model);
  }
}

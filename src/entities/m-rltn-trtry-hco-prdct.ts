import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('m_rltn_trtry_hco_prdct', { schema: 'cmd_owner' })
export class MRltnTrtryHcoPrdctEntity extends BaseModel {
  @Column('int4', { name: 'year_month' })
  yearMonth: number;

  @Column('varchar', { name: 'group_key', length: 100 })
  groupKey: string;

  @Column('int4', { name: 'bu_id' })
  buId: number;

  @Column('int4', { name: 'prdct_ctgry_id' })
  prdctCtgryId: number;

  @Column('int4', { name: 'prdct_id' })
  prdctId: number;

  @Column('int4', { name: 'star_hco_id' })
  starHcoId: number;

  @Column('int4', { name: 'hco_id' })
  hcoId: number;

  @Column('varchar', { name: 'type', length: 100, nullable: true })
  type: string;

  @Column('int4', { name: 'stts_ind', default: 1 })
  sttsInd: number;

  @Column({ name: 'is_hand_made', default: false })
  isHandMade?: boolean;

  constructor(model?: any) {
    super();
    Object.assign(this, model);
  }
}

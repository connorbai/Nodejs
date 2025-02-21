import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('m_rltn_hco_prdct_pharmacy', { schema: 'cmd_owner' })
export class MRltnHcoPrdctPharmacyEntity extends BaseModel {
  @Column('int4', { name: 'year_month' })
  yearMonth: number;

  @Column('int4', { name: 'prdct_id' })
  prdctId: number;

  @Column('int4', { name: 'hco_id' })
  hcoId: number;

  @Column('int4', { name: 'pharmacy_id' })
  pharmacyId: number;

  @Column('int4', { name: 'stts_ind', default: 1 })
  sttsInd: number;

  constructor(model?: any) {
    super();
    Object.assign(this, model);
  }
}

import { BaseEntity, Column, Entity } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('m_rltn_hco_prdct', { schema: 'cmd_owner' })
export class MRltnHcoPrdctEntity extends BaseModel {
  @Column('int4', { name: 'year_month' })
  yearMonth: number;

  @Column('int4', { name: 'bu_id' })
  buId: number;

  @Column('int4', { name: 'hco_id' })
  hcoId: number;

  @Column('int4', { name: 'pharmacy_id' })
  pharmacyId: number;

  @Column('int4', { name: 'ctgry_id' })
  ctgryId: number;

  @Column('varchar', { name: 'pharmacy_type', length: 120 })
  pharmacyType: string;

  @Column({ name: 'effective_date' })
  effectiveDate: string;

  @Column({ name: 'is_approval', default: false })
  isApproval: string;

  @Column('int4', { name: 'stts_ind', default: 1 })
  sttsInd: number;

  constructor(model?: any) {
    super();
    Object.assign(this, model);
  }
}

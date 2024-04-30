import { BaseEntity, Column, Entity } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('m_rltn_trtry_dctr_brand', { schema: 'cmd_owner' })
export class MRltnTrtryDctrBrandEntity extends BaseModel {
  @Column('integer', { name: 'cycle' })
  cycle: number;

  @Column('integer', { name: 'trtry_id' })
  trtryId: number;

  @Column('character varying', { name: 'trtry_cd', length: 100 })
  trtryCd: string;

  @Column('integer', { name: 'dctr_id' })
  dctrId: number;

  @Column('character varying', { name: 'tier', length: 100 })
  tier: string;

  @Column('integer', { name: 'goal_freq' })
  goalFreq: number;

  @Column('character varying', { name: 'algnmnt_id', length: 100 })
  algnmntId: string;

  @Column('integer', { name: 'ctgry_id' })
  ctgryId: number;

  @Column('character varying', { name: 'ctgry_nm', length: 100 })
  ctgryNm: number;

  @Column({ name: 'efctv_start_dt', type: 'timestamp', nullable: true })
  public efctvStartDt?: Date;

  @Column({ name: 'efctv_end_dt', type: 'timestamp', nullable: true })
  public efctvEndDt?: Date;

  @Column({ name: "cc", type: "integer", nullable: true })
  public cc?: number;

  @Column('character varying', { name: 'indct_cd', length: 100 })
  public indctCd: string;

  @Column('character varying', { name: 'indct_nm', length: 100 })
  public indctNm: string;

  @Column('character varying', { name: 'dctr_grp1', length: 1000 })
  public dctrGrp1?: string;

  @Column('character varying', { name: 'dctr_grp2', length: 1000 })
  public dctrGrp2?: string;

  @Column('character varying', { name: 'dctr_grp3', length: 1000 })
  public dctrGrp3?: string;

  @Column('character varying', { name: 'dctr_grp4', length: 1000 })
  public dctrGrp4?: string;

  @Column('character varying', { name: 'dctr_grp5', length: 1000 })
  public dctrGrp5?: string;

  constructor(model?: any) {
    super();
    Object.assign(this, model);
  }
}

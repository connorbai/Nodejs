import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('m_rltn_trtry_dctr', { schema: 'cmd_owner' })
export class MRltnTrtryDctrEntity extends BaseModel {
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

  @Column({ name: 'efctv_start_dt', type: 'timestamp', nullable: true })
  public efctvStartDt?: Date;

  @Column({ name: 'efctv_end_dt', type: 'timestamp', nullable: true })
  public efctvEndDt?: Date;

  @Column({ name: "cc", type: "integer", nullable: true })
  public cc?: number;

  constructor(model?: any) {
    super();
    Object.assign(this, model);
  }
}

import { Column } from '../../../core/typeorm-extension/column-decorator';
import { Entity } from '../../../core/typeorm-extension/entity-decorator';
import { BaseEntity } from '../../../core';

@Entity('m_rltn_trtry_hco', { schema: 'cmd_owner' })
export class MRltnTrtryHcoEntity extends BaseEntity {
  @Column('int4', { name: 'year_month' })
  yearMonth: number;

  @Column('varchar', { name: 'group_key', length: 100 })
  groupKey: string;

  @Column('int4', { name: 'bu_id' })
  buId: number;

  @Column('int4', { name: 'star_hco_id' })
  starHcoId: number;

  @Column('int4', { name: 'hco_id' })
  hcoId: number;

  @Column('varchar', { name: 'type', length: 100, nullable: true })
  type: string;

  @Column('int4', { name: 'stts_ind', default: 1 })
  sttsInd: number;

  constructor(model?: any) {
    super();
    Object.assign(this, model);
  }
}

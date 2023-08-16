import { Column } from '../../../core/typeorm-extension/column-decorator';
import { Entity } from '../../../core/typeorm-extension/entity-decorator';
import { BaseEntity } from '../../../core';

@Entity('m_rltn_slv_trtry', { schema: 'cmd_owner' })
export class MRltnSlvTrtryEntity extends BaseEntity {
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

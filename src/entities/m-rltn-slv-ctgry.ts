import { Column } from '../../../core/typeorm-extension/column-decorator';
import { Entity } from '../../../core/typeorm-extension/entity-decorator';
import { BaseEntity } from '../../../core';

@Entity('m_rltn_slv_ctgry', { schema: 'cmd_owner' })
export class MRltnSlvCtgryEntity extends BaseEntity {
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

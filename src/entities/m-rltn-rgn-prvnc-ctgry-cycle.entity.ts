import { Column } from '../../../core/typeorm-extension/column-decorator';
import { Entity } from '../../../core/typeorm-extension/entity-decorator';
import { BaseEntity } from '../../../core';

@Entity('m_rltn_rgn_prvnc_ctgry_cycle', { schema: 'cmd_owner' })
export class MRltnRgnPrvncCtgryCycleEntity extends BaseEntity {
  @Column('integer', { name: 'cycle' })
  cycle: number;

  @Column('integer', { name: 'prdct_ctgry_id' })
  prdctCtgryId: number;

  @Column('integer', { name: 'rgn_id' })
  rgnId: number;

  @Column('character varying', { name: 'prd_gk', length: 50 })
  prdGk: string;

  @Column('integer', { name: 'prvnc_id' })
  prvncId: number;

  @Column('integer', { name: 'city_id' })
  cityId: number;

  @Column('integer', { name: 'stts_ind' })
  sttsInd: number;

  constructor(model?: any) {
    super();
    Object.assign(this, model);
  }
}

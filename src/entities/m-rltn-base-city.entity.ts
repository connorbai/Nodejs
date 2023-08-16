import { Column } from '../../../core/typeorm-extension/column-decorator';
import { Entity } from '../../../core/typeorm-extension/entity-decorator';
import { BaseEntity } from '../../../core';

@Entity('m_rltn_base_city', { schema: 'cmd_owner' })
export class MRltnBaseCityEntity extends BaseEntity {
  @Column('int4', { name: 'cycle' })
  cycle: number;

  @Column('varchar', { name: 'prd_gk', length: 40 })
  prdGk: string;

  @Column('varchar', { name: 'city_cd', length: 200 })
  cityCd: string;

  @Column('varchar', { name: 'city_nm', length: 200 })
  cityNm: string;

  @Column('int4', { name: 'stts_ind' })
  sttsInd: number;

  constructor(model?: any) {
    super();
    Object.assign(this, model);
  }
}

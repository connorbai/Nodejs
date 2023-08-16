import { Column } from '../../../core/typeorm-extension/column-decorator';
import { Entity } from '../../../core/typeorm-extension/entity-decorator';
import { BaseEntity } from '../../../core';

@Entity('m_slv', { schema: 'cmd_owner' })
export class MSLVEntity extends BaseEntity {
  @Column('varchar', { name: 'sleeve_name' })
  sleeveName: string | null;

  @Column('int4', { name: 'start_cycle' })
  startCycle: number;

  @Column('int4', { name: 'end_cycle' })
  endCycle: number;

  @Column('int4', { name: 'stts_ind', default: 1 })
  sttsInd: number;

  @Column('int4', { name: 'star_id' })
  starId: number;

  @Column({ name: 'is_invntd', default: false })
  isInvntd?: boolean;

  constructor(model?: any) {
    super();
    Object.assign(this, model);
  }
}

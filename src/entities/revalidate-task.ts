import { Column } from '../../../core/typeorm-extension/column-decorator';
import { Entity } from '../../../core/typeorm-extension/entity-decorator';
import { BaseEntity } from '../../../core';

@Entity('revalidate_task', { schema: 'cmd_owner' })
export class RevalidateTaskEntity extends BaseEntity {
  @Column('varchar', { name: 'filename', length: 255 })
  filename: string;

  @Column('varchar', { name: 'status', length: 255 })
  status: string;

  @Column('varchar', { name: 'errormsg', length: 2000 })
  errorMsg: string;

  constructor(model?: any) {
    super();
    Object.assign(this, model);
  }
}

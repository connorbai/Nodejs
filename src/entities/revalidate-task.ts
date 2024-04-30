import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('revalidate_task', { schema: 'cmd_owner' })
export class RevalidateTaskEntity extends BaseModel {
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

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity('m_rltn_base_city', { schema: 'cmd_owner' })
export class MRltnBaseCityEntity extends BaseModel {
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

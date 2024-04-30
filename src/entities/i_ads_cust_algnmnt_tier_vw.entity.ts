import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, VersionColumn } from "typeorm";

@Entity('i_ads_cust_algnmnt_tier_vw', { schema: 'cmd_owner' })
export class IAdsCustAlgnmntTierVwEntity {
  @PrimaryGeneratedColumn( { name: 'id' })
  id: number;

  @Column('character varying', { name: 'actl_tier', length: 200 })
  actlTier: string;

  @Column('character varying', { name: 'algnmnt_id', length: 100 })
  algnmntId: string;

  @Column('character varying', { name: 'algnmnt_country_cd', length: 40 })
  algnmntCountryCd: string;

  @Column('character varying', { name: 'cust_id', length: 200 })
  custId: string;

  @Column({ name: 'cust_tier_strt_dt', type: 'timestamp' })
  public custTierStrtDt: Date;

  @Column({ name: 'cust_tier_end_dt', type: 'timestamp' })
  public custTierEndDt: Date;

  @Column('character varying', { name: 'cust_typ_cd', length: 40 })
  custTypCd: string;

  @Column('character varying', { name: 'recmnd_tier', length: 40 })
  recmndTier: string;

  @Column('character varying', { name: 'cust_algnmnt_typ_cd', length: 100 })
  custAlgnmntTypCd: string;

  @Column('character varying', { name: 'src_algnmnt_typ_cd', length: 40 })
  srcAlgnmntTypCd: string;

  @Column({ name: 'ods_ld_dt', type: 'timestamp' })
  public odsLdDt: Date;

  @Column({ name: 'ods_lst_updt_dt', type: 'timestamp' })
  public odsLstUpdtDt: Date;

  @Column('character varying', { name: 'src_sys_cd', length: 200 })
  srcSycCd: string;

  @Column('character varying', { name: 'ods_ld_usr', length: 200 })
  odsLdUsr: string;

  @Column('character varying', { name: 'ods_lst_udpt_usr', length: 200 })
  odsLstUdptUsr: string;
}

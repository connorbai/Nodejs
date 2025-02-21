import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('i_ads_cust_algnmnt', { schema: 'cmd_owner' })
export class IAdsCustAlgnmntEntity {
  @PrimaryGeneratedColumn( { name: 'id' })
  id: number;

  @Column('character varying', { name: 'algnmnt_id', length: 100 })
  algnmntId: string;

  @Column('character varying', { name: 'cust_id', length: 200 })
  custId: string;

  @Column({ name: 'cust_algnmnt_strt_dt', type: 'timestamp' })
  public custAlgnmntStrtDt: Date;

  @Column({ name: 'cust_algnmnt_end_dt', type: 'timestamp' })
  public custAlgnmntEndDt: Date;

  @Column('character varying', { name: 'cust_typ_cd', length: 40 })
  custTypCd: string;

  @Column('character varying', { name: 'src_external_id', length: 40 })
  srcExternalId: string;

  @Column('character varying', { name: 'cust_algnmnt_typ_cd', length: 100 })
  custAlgnmntTypCd: string;

  @Column('character varying', { name: 'crm_sync_flg', length: 40 })
  crmSyncFlg: string;

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

  @Column('character varying', { name: 'algnmnt_country_cd', length: 40 })
  algnmntCountryCd: string;

  @Column('character varying', { name: 'src_algnmnt_typ_cd', length: 40 })
  srcAlgnmntTypCd: string;

  @Column('character varying', { name: 'dlt_indctr', length: 40 })
  dltIndctr: string;
}

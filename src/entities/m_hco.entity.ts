import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, VersionColumn } from "typeorm";

@Entity({ schema: 'cmd_owner', name: 'm_hco' })
export class MHcoEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'hco_id' })
  public hcoId: number;

  @Column({ name: 'star_hco_id', nullable: true })
  public starHcoId: number;

  @Column({ type: 'varchar', name: 'hco_name', length: 1000, nullable: true })
  public hcoName: string;

  @Column({ type: 'varchar', name: 'hco_englsh_name', length: 2000, nullable: true })
  public hcoEnglshName: string;

  @Column({ type: 'varchar', name: 'hco_desc', length: 4000, nullable: true })
  public hcoDesc: string;

  @Column({ type: 'varchar', name: 'hco_cd', length: 80, nullable: true })
  public hcoCd: string;

  @Column({ type: 'varchar', name: 'hco_type_cd', length: 80, nullable: true })
  public hcoTypeCd: string;

  @Column({ type: 'varchar', name: 'hco_type_name', length: 100, nullable: true })
  public hcoTypeName: string;

  @Column({ type: 'varchar', name: 'cnty_cd', length: 80, nullable: true })
  public cntyCd: string;

  @Column({ type: 'varchar', name: 'cnty_name', length: 100, nullable: true })
  public cntyName: string;

  @Column({ type: 'varchar', name: 'city_cd', length: 80, nullable: true })
  public cityCd: string;

  @Column({ type: 'varchar', name: 'city_name', length: 100, nullable: true })
  public cityName: string;

  @Column({ type: 'varchar', name: 'phone_1', length: 200, nullable: true })
  public phone1: string;

  @Column({ type: 'varchar', name: 'phone_2', length: 200, nullable: true })
  public phone2: string;

  @Column({ type: 'varchar', name: 'adrs_line_1', length: 1000, nullable: true })
  public adrsLine1: string;

  @Column({ type: 'varchar', name: 'adrs_line_2', length: 1000, nullable: true })
  public adrsLine2: string;

  @Column({ type: 'varchar', name: 'url', length: 2000, nullable: true })
  public url: string;

  @Column({ type: 'varchar', name: 'pstl', length: 400, nullable: true })
  public pstl: string;

  @Column({ name: 'stts_ind', nullable: true })
  public sttsInd: number;

  @Column({ type: 'varchar', name: 'hco_stts_cd', nullable: true })
  public hcoSttsCd: string;

  @Column({ type: 'varchar', name: 'hco_stts_name', nullable: true })
  public hcoSttsName: string;

  @Column({ type: 'varchar', name: 'merged_to', length: 200, nullable: true })
  public mergedTo: string;

  @Column({ name: 'merged_date', nullable: true })
  public mergedDate?: Date;

  @Column({ type: 'varchar', name: 'vn_entity_id', length: 80, nullable: true })
  public vnEntityId: string;

  @Column({ type: 'varchar', name: 'adrs_status', length: 80, nullable: true })
  public adrsStatus: string;

  @Column({ type: 'varchar', name: 'frmt_adrs', length: 1000, nullable: true })
  public frmtAdrs: string;

  @Column({ type: 'varchar', name: 'sub_clsfctn_cd', length: 80, nullable: true })
  public subClsfctnCd: string;

  @Column({ type: 'varchar', name: 'sub_clsfctn_name', length: 100, nullable: true })
  public subClsfctnName: string;

  @Column({ type: 'varchar', name: 'clsfctn_cd', length: 80, nullable: true })
  public clsfctnCd: string;

  @Column({ type: 'varchar', name: 'clsfctn_name', length: 100, nullable: true })
  public clsfctnName: string;

  @Column({ name: 'cnt_bed', nullable: true })
  public cntBed: number;

  @Column({ name: 'cnt_lcnsd_asst_dctr', nullable: true })
  public cntLcnsdAsstDctr: number;

  @Column({ type: 'varchar', name: 'parent_hco_v_id', length: 80, nullable: true })
  public parentHcoVId: string;

  @Column({ name: 'createduser', nullable: true })
  public createdUser?: string;

  @Column({ name: 'createddate', nullable: true })
  public createdDate?: Date;

  @Column({ name: 'modifieduser', nullable: true })
  public modifiedUser?: string;

  @Column({ name: 'modifieddate', nullable: true })
  public modifiedDate?: Date;

  @Column({ name: 'isdeleted', default: false })
  public isDeleted?: boolean;

  @VersionColumn({ name: 'versionnumber', nullable: true })
  public versionNumber?: number;

  @Column({ type: 'varchar', name: 'rcrd_state_cd', length: 80, nullable: true })
  public rcrdStateCd: string;

  @Column({ type: 'varchar', name: 'rcrd_state_name', length: 100, nullable: true })
  public rcrdStateName: string;

  @Column({ type: 'varchar', name: 'prvnc_cd', length: 80, nullable: true })
  public prvncCd: string;

  @Column({ type: 'varchar', name: 'prvnc_name', length: 100, nullable: true })
  public prvncName: string;

  // 2022-7-19 added
  @Column({ type: 'varchar', name: 'hco_desc_2' })
  public hcoDesc2: string;

  @Column({ type: 'varchar', name: 'hco_desc_3' })
  public hcoDesc3: string;

  @Column({ type: 'varchar', name: 'organization_id' })
  public organizationId: string;

  @Column({ type: 'varchar', name: 'count_discharged_patients' })
  public countDischargedPatients: string;

  @Column({ type: 'varchar', name: 'established_date' })
  public establishedDate: string;

  @Column({ type: 'varchar', name: 'count_employees' })
  public countEmployees: string;

  @Column({ type: 'varchar', name: 'major_class_of_trade' })
  public majorClassOfTrade: string;

  @Column({ type: 'varchar', name: 'status_update_time' })
  public statusUpdateTime: string;

  @Column({ type: 'varchar', name: 'hospital_grade' })
  public hospitalGrade: string;

  @Column({ type: 'varchar', name: 'record_version' })
  public recordVersion: string;

  @Column({ type: 'varchar', name: 'department_class' })
  public departmentClass: string;

  @Column({ type: 'varchar', name: 'department_class_name' })
  public departmentClassName: string;

  @Column({ type: 'varchar', name: 'hospital_grade_name' })
  public hospitalGradeName: string;

  @Column({ type: 'varchar', name: 'premise' })
  public premise: string;

  @Column({ type: 'varchar', name: 'delivery_address' })
  public deliveryAddress: string;

  @Column({ type: 'varchar', name: 'delivery_address_1' })
  public deliveryAddress_1: string;

  @Column({ type: 'varchar', name: 'thoroughfare' })
  public thoroughfare: string;

  @Column({ type: 'varchar', name: 'address_ordinal' })
  public addressOrdinal: string;

  @Column({ type: 'varchar', name: 'latitude' })
  public latitude: number;

  @Column({ type: 'varchar', name: 'longitude' })
  public longitude: number;

  @Column({ type: 'varchar', name: 'adrs_crt_dt' })
  public adrsCrtDt: Date;

  @Column({ type: 'varchar', name: 'adrs_updt_dt' })
  public adrsUpdtDt: Date;

  @Column({ type: 'int4', name: 'cust_type' })
  public custType: number;
}

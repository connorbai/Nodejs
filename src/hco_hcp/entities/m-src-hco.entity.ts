import { MSrcHcoModel } from "../model";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../../entities/base.entity";


@Entity({ schema: 'cmd_owner', name: 'm_src_hco' })
export class MSrcHcoEntity extends BaseEntity {
    @PrimaryColumn({ name: 'hco_id' })
    public hcoId: number;

    @Column({ name: 'hco_name', length: 1000, nullable: true })
    public hcoName: string;

    @Column({ name: 'hco_englsh_name', length: 2000, nullable: true })
    public hcoEnglshName: string;

    @Column({ name: 'hco_desc', length: 4000, nullable: true })
    public hcoDesc: string;

    @Column({ name: 'hco_cd', length: 80, nullable: true })
    public hcoCd: string;

    @Column({ name: 'hco_type_cd', length: 80, nullable: true })
    public hcoTypeCd: string;

    @Column({ name: 'cnty_name', length: 40, nullable: true })
    public cntyName: string;

    @Column({ name: 'city_name', length: 40, nullable: true })
    public cityName: string;

    @Column({ name: 'phone_1', length: 200, nullable: true })
    public phone1: string;

    @Column({ name: 'phone_2', length: 200, nullable: true })
    public phone2: string;

    @Column({ name: 'adrs_line_1', length: 1000, nullable: true })
    public adrsLine1: string;

    @Column({ name: 'adrs_line_2', length: 1000, nullable: true })
    public adrsLine2: string;

    @Column({ name: 'url', length: 2000, nullable: true })
    public url: string;

    @Column({ name: 'pstl', length: 400, nullable: true })
    public pstl: string;

    @Column({ name: 'hco_stts_cd', nullable: true })
    public hcoSttsCd: string;

    @Column({ name: 'vn_entity_id', length: 80, nullable: true })
    public vnEntityId: string;

    @Column({ name: 'adrs_status', length: 80, nullable: true })
    public adrsStatus: string;

    @Column({ name: 'frmt_adrs', length: 1000, nullable: true })
    public frmtAdrs: string;

    @Column({ name: 'afltn_role', length: 80, nullable: true })
    public afltnRole: string;

    @Column({ name: 'sub_clsfctn_cd', length: 80, nullable: true })
    public subClsfctnCd: string;

    @Column({ name: 'sub_clsfctn_name', length: 100, nullable: true })
    public subClsfctnName: string;

    @Column({ name: 'clsfctn_cd', length: 80, nullable: true })
    public clsfctnCd: string;

    @Column({ name: 'clsfctn_name', length: 100, nullable: true })
    public clsfctnName: string;

    @Column({ name: 'cnt_bed', nullable: true })
    public cntBed: number;

    @Column({ name: 'cnt_lcnsd_asst_dctr', nullable: true })
    public cntLcnsdAsstDctr: number;

    @Column({ name: 'merged_to', length: 200, nullable: true })
    public mergedTo: string;

    @Column({ type: 'timestamp', name: 'merged_date', nullable: true })
    public mergedDate: Date;

    @Column({ name: 'crt_user', length: 80, nullable: true })
    public crtUser: string;

    @Column({ type: 'timestamp', name: 'crt_dt' })
    public crtDt: Date;

    @Column({ name: 'updt_user', length: 80, nullable: true })
    public updtUser: string;

    @Column({ type: 'timestamp', name: 'updt_dt' })
    public updtDt: Date;

    @Column({ name: 'rcrd_state_cd', length: 80, nullable: true })
    public rcrdStateCd: string;

    @Column({ name: 'parent_hco_v_id', length: 80, nullable: true })
    public parentHcoVId: string;

    @Column({ name: 'prvnc_cd', length: 40, nullable: true })
    public prvncCd: string;

    @Column({ name: 'hco_desc_2' })
    public hcoDesc2: string;

    @Column({ name: 'hco_desc_3' })
    public hcoDesc3: string;

    @Column({ name: 'organization_id' })
    public organizationId: string;

    @Column({ name: 'count_discharged_patients' })
    public countDischargedPatients: number;

    @Column({ name: 'established_date' })
    public establishedDate: string;

    @Column({ name: 'count_employees' })
    public countEmployees: number;

    @Column({ name: 'major_class_of_trade' })
    public majorClassOfTrade: string;

    @Column({ name: 'status_update_time' })
    public statusUpdateTime: Date;

    @Column({ name: 'hospital_grade' })
    public hospitalGrade: string;

    @Column({ name: 'record_version' })
    public recordVersion: number;

    @Column({ name: 'department_class' })
    public departmentClass: string;

    @Column({ name: 'premise' })
    public premise: string;

    @Column({ name: 'delivery_address' })
    public deliveryAddress: string;

    @Column({ name: 'delivery_address_1' })
    public deliveryAddress_1: string;

    @Column({ name: 'thoroughfare' })
    public thoroughfare: string;

    @Column({ name: 'address_ordinal' })
    public addressOrdinal: string;

    @Column({ name: 'latitude' })
    public latitude: number;

    @Column({ name: 'longitude' })
    public longitude: number;

    @Column({ name: 'adrs_crt_dt' })
    public adrsCrtDt: Date;

    @Column({ name: 'adrs_updt_dt' })
    public adrsUpdtDt: Date;

    @Column({ name: 'tag' })
    public tag: string;


    prvncName: string;
    cityCd: string;
    cntyCd: string;

    constructor(msrcHcoModel: MSrcHcoModel) {
        super();
        Object.assign(this, msrcHcoModel);
    }
}


import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { BaseModel } from "./base.entity";

@Entity({ schema: 'cmd_owner', name: 'm_prdct' })
export class MPrdctEntity extends BaseModel {

    // @PrimaryGeneratedColumn({ name: 'id' })
    // id: number;

    @Column({ name: 'prdct_name_cn', nullable: true })
    public prdctNameCn: string;

    @Column('varchar', { name: 'prdct_desc', length: 4000 })
    public prdctDesc: string;

    @Column('varchar', { name: 'prdct_cntnt_type_id', length: 255 })
    public prdctCntntType_id: string;

    @Column({ name: 'gx_unit' })
    public gxUnit: number;

    @Column({ name: 'gx_unit_elmnt_1' })
    public gxUnitElmnt1: number;

    @Column({ name: 'gx_unit_elmnt_2' })
    public gxUnitElmnt2: number;

    @Column({ name: 'prdct_type_id' })
    public prdctTypeId: number;

    @Column('int4', { name: 'stts_ind', default: 1 })
    sttsInd: number;

    @Column('int4', { name: 'vldtn_stts_ind', default: 1 })
    vldtnSttsInd: number;

    @Column({ name: "mrkt_start_dt", type: "timestamp", nullable: true })
    public mrktStartDt?: Date;

    @Column({ name: "mrkt_end_dt", type: "timestamp", nullable: true })
    public mrktEndDt?: Date;

    @Column('int4', { name: 'prmtn_ind' })
    prmtnInd: number;

    @Column('int4', { name: 'imprt_ind' })
    imprtInd: number;

    @Column('int4', { name: 'cold_chain_ind' })
    coldChainInd: number;

    @Column('int4', { name: 'prdct_ctgry_id' })
    prdctCtgryId: number;

    @Column({ name: "rcmmndtn" })
    public rcmmndtn?: string;

    @Column({ name: "glbl_prdct_cd" })
    public glblPrdctCd?: string;

    @Column({ name: "prdct_name_en" })
    public prdctNameEn?: string;

    @Column({ name: "prdct_cd" })
    public prdctCd?: string;

    @Column({ name: "qntty_unit" })
    public qnttyUnit?: string;

    @Column('int4', { name: 'star_id' })
    starId: number;

    // @Column({ name: "createdUser", nullable: true })
    // public createdUser?: string;

    // @Column({ name: "createdDate", type: "timestamp", nullable: true })
    // public createdDate?: Date;

    // @Column({ name: "modifiedUser", nullable: true })
    // public modifiedUser?: string;

    // @Column({ name: "modifiedDate", type: "timestamp", nullable: true })
    // public modifiedDate?: Date;

    // @Column({ name: "isDeleted", default: false })
    // public isDeleted?: boolean;

    // @VersionColumn({ name: "versionNumber", nullable: true })
    // public versionNumber?: number;
}

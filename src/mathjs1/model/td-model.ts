import { IsHcpExist } from "../validator/hcp-validator"
import { ColumnName } from "../core/decorator"
import { BaseColumn } from './base-model'


export class Test1 extends BaseColumn {

    @ColumnName({ name: '*YearMonth', column: 0 })
    yearMonth: number

    @ColumnName({ name: '*GK', column: 1 })
    gk: string

    @IsHcpExist({ message: 'it must has hcpId' })
    @ColumnName({ name: '*HCP ID', column: 2 })
    hcpId: number

    @ColumnName({ name: '*Tier ID', column: 3 })
    tier: number

    @ColumnName({ name: '*CC', column: 4 })
    cc: number | null

    @ColumnName({ name: 'Message', column: 5 })
    message: string

    // uniqueKey() {
    //     this.uniqKey = `${this.yearMonth}_${this.gk}_${this.hcpId}_${this.tier}_${this.cc}`
    // }

    // uniqKey = ''
}
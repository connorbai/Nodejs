import { BaseService } from "./baseService"

export class CSVContainer {


    static target: any
    static model: any
    static dataSource = new Set<BaseService>()

    static create(target) {
        this.target = target
        return this
    }

    static setModel(model) {
        this.model = model
    }

    static addDataSource(service) {
        this.dataSource.add(service)
    }

    static async execute() {
        const promiseAll = []
        this.dataSource.forEach(s => promiseAll.push(s.init()))
        await Promise.all(promiseAll)
        await this.target(this.model)
    }
}
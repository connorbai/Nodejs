import { BaseService } from "./baseService"

export function create(fn) {
    const app  = new CSVContainer()
    app.setTarget(fn)
    return app
}


export class CSVContainer {


    target: any
    model: any
    dataSource = new Set<BaseService>()

    setTarget(target) {
        this.target = target
        return this
    }

    setModel(model) {
        this.model = model
    }

    addDataSource(service) {
        this.dataSource.add(service)
    }

    async execute() {
        const promiseAll = []
        this.dataSource.forEach(s => promiseAll.push(s.init()))
        await Promise.all(promiseAll)
        await this.target(this.model)
    }
}
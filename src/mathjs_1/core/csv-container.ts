import Container from "typedi"
import { BaseService } from "../services/baseService"

export function factoryCreate(fn) {
    const app  = new CSVContainer()
    app.setTarget(fn)
    return app
}


export class CSVContainer {


    target: any
    model: any
    dataSource: BaseService[] = []

    setTarget(target) {
        this.target = target
        return this
    }

    setModel(model) {
        this.model = model
    }

    addDataSource(service) {
        this.dataSource.push(service)
    }

    async execute() {
        const instances: BaseService[] = this.dataSource.map(v => Container.get(v as any))

        await Promise.all(instances.map(v => v.init()))
        await this.target(this.model)
    }
}
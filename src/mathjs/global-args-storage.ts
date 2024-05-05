import { SOURCE_TYPE } from "./enum"

const modelArgs = Symbol('@modelArgs')



export class GlobalArgsStorage {

    columns = []

    dataSource = new Set<SOURCE_TYPE>()

    addSource(type: SOURCE_TYPE) {
        this.dataSource.add(type)
    }

    getGlobal() {
        global[modelArgs] = {}
    }

}


const globalArgsStorage = new GlobalArgsStorage()

export { globalArgsStorage }
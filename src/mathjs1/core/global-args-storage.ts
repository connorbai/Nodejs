// import { SOURCE_TYPE } from "./enum"

// const modelArgs = Symbol('@modelArgs')



// export class GlobalArgsStorage {

//     columns = []

//     dataSource = new Set<SOURCE_TYPE>()

//     addSource(type: SOURCE_TYPE) {
//         this.dataSource.add(type)
//     }

//     getGlobal() {
//         global[modelArgs] = {}
//     }

// }


class MetadataArgsStorage {
    // readonly tables: TableMetadataArgs[];
    // readonly tables: TableMetadataArgs[];
    readonly columns: any[] = []
    filterColumns(target) {
        return this.columns.filter(col => {
            return col.target == target
        })
    }
    // filterColumns(target: Function | string): ColumnMetadataArgs[];
}

const metadataArgsStorage = global.metadataArgsStorage = new MetadataArgsStorage()


// const globalArgsStorage = new GlobalArgsStorage()

export { /* globalArgsStorage, */ metadataArgsStorage }
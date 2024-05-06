import { makeObservable, observable, observe, spy } from 'mobx'

const logger = console.log

spy(change => {
    if(change.type=='report-end') return
    // logger('change', change)
})

class App {

    @observable.shallow array: any[] = []

    disposer

    constructor() {
        makeObservable(this)

        this.disposer = observe(this.array, change => {
            logger('change', change)
        })


        this.array.push('a')
        this.array.push('b')
        this.array.push('c')
        this.array.push('d')
        this.array.push('e')
        const pre = (this.array as any).remove('e')
        this.array.splice(0, 0, 'e')
        logger(this.array)
    }
}


export { App }
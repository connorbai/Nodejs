// export { default as observable } from './observable';
// export { default as autorun } from './autorun';
// export * from './observable.js'
// export * from './autorun.js'
import { observable } from './observable.js'
import { autorun } from './autorun.js'

const data = observable({ age: 10, name: 'Zchary' })
autorun(() => { console.log(`autorun: ${data.name} is ${data.age} years old`) })
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        data.age++;
        console.log(i+1)
    }, 1e3 * (i+1))
}

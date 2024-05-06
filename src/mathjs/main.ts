import { Container } from 'typedi';
import { Validator } from 'class-validator';

export async function AppMain(model) {
    // const postService = Container.get(HcoService)
    // const bool = await postService.userExist(user)
    // const sheets = xlsx.parse('./filename2.csv', { raw: true })

    // const [sheet1] = sheets
    // const { data } = sheet1
    const datas = [
        {name: '张三',password: 'kcikdsd', email: 'null'},
        {name: '张4',password: 'aaaa', email: '40'},
        {name: '',password: 'www', email: '20'},
        {name: '张ok',password: 'eeeeddd', email: '10'},
        {name: '李四',password: 'sssss', email: '0'},
    ]

    const datas2 = datas.map(v => new model(v))

    for (const iterator of datas2) {
        console.log('------------bool-----------:', )
        const validator = Container.get(Validator)
        const errors = await validator.validate(iterator)
        
        const constraints = errors.map(e => Object.values(e.constraints))
        const messages = constraints.flat()
        iterator['message'] = messages.join(', ')
        console.log('------------errors-----------:', errors)
    }


}



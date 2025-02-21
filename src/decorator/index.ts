
import {
    IsNotEmpty,
    ValidationArguments,
    ValidationOptions,
    Validator,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
    validate,
    useContainer,// as validatorUseContainer
    getFromContainer
} from 'class-validator';
import xlsx from 'node-xlsx';
import "reflect-metadata";
import { Container, Inject, Service } from 'typedi';
import { EntityRepository, Repository, createConnection, useContainer as typeormUseContainer } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions'
import { random } from 'lodash-es';
// import * as entities from '../entities'

import { MHcoEntity } from '../entities/m_hco.entity';
import { ColumnName } from '../mathjs1/core/decorator';

// useContainer(Container);


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

const defaultMetadata = { name: 'none' }
const Column = (metadata = defaultMetadata) => {
    return (target, key, descriptor) => {
        Reflect.defineMetadata('name', metadata.name, descriptor.value, 'aaa');
        return descriptor;
    };
}

function getMetadataArgsStorage() {
    // const globalScope = PlatformTools_1.PlatformTools.getGlobalVariable();
    // if (!globalScope.typeormMetadataArgsStorage)
    //     globalScope.typeormMetadataArgsStorage = new MetadataArgsStorage_1.MetadataArgsStorage();
    // return globalScope.typeormMetadataArgsStorage;
}

class BaseColumn {

}


class Test1 extends BaseColumn {

    @ColumnName({ name: '*YearMonth', column: 0 })
    yearMonth: number

    @ColumnName({ name: '*GK', column: 1 })
    gk: string

    // @IsNotEmpty({ message: 'it must has hcpId' })
    @ColumnName({ name: '*HCP ID', column: 2 })
    hcpId: number

    @ColumnName({ name: '*Tier ID', column: 3 })
    tier: number

    @ColumnName({ name: '*CC', column: 4 })
    cc: number | null

    uniqueKey() {
        this.uniqKey = `${this.yearMonth}_${this.gk}_${this.hcpId}_${this.tier}_${this.cc}`
    }

    uniqKey = ''
}

// @Service()
// class XlsxResolver {

//     data: any[]

//     readBlob(object) {
//         const sheets = xlsx.parse('D:/tmp/debug/tdRelation_test.csv', { raw: true })
//         console.log('sheets: ', sheets);
//         const [sheet1] = sheets
//         const { data } = sheet1
//         console.log('datas: ', data);

//         const headers = data.shift()
//         console.log('headers: ', headers);
//         this.data = data
//     }

//     parseJson(object) {
//         const columns = metadataArgsStorage.filterColumns(object)
//         const objects = this.data.map(v => {
//             // console.log('v: ', v, object);
//             const obj = new object()
//             columns.forEach(col => {
//                 const val = v[col.options.column]
//                 obj[col.propertyName] = val ? col.options.type(val) : val
//             });
//             return obj
//         })
//         return objects
//     }
// }

// export class Post {
//     @Length(10, 20, {
//         message: 'length test1...............'
//     })
//     title: string;

//     @Contains('hello')
//     text: string;

//     @IsString()
//     @Min(10)
//     @Max(0)
//     rating: number;

//     @IsEmail()
//     email: string;

//     @IsFQDN()
//     site: string;

//     @IsDate()
//     createDate: Date;
// }

// let post = new Post();
// post.title = 'Hello'; // should not pass
// post.text = 'this is a great post about hell world'; // should not pass
// post.rating = 11; // should not pass
// post.email = 'google.com'; // should not pass
// post.site = 'googlecom'; // should not pass

// validate(post).then(errors => {
//     // errors is an array of validation errors
//     if (errors.length > 0) {
//         console.log('validation failed. errors: ', errors);
//     } else {
//         console.log('validation succeed');
//     }
// });

// validateOrReject(post).catch(errors => {
//     console.log('Promise rejected (validation failed). Errors: ', errors);
// });
// async function validateOrRejectExample(input) {
//     try {
//         await validateOrReject(input);
//     } catch (errors) {
//         console.log('Caught promise rejection (validation failed). Errors: ', errors);
//     }
// }


// export function IsLongerThan(property: string, validationOptions?: ValidationOptions) {
//     return function (object: Object, propertyName: string) {
//         registerDecorator({
//             name: 'isLongerThan',
//             target: object.constructor,
//             propertyName: propertyName,
//             constraints: [property],
//             options: validationOptions,
//             validator: {
//                 validate(value: any, args: ValidationArguments) {
//                     const [relatedPropertyName] = args.constraints;
//                     const relatedValue = (args.object as any)[relatedPropertyName];
//                     return typeof value === 'string' && typeof relatedValue === 'string' && value.length > relatedValue.length; // you can return a Promise<boolean> here as well, if you want to make async validation
//                 },
//             },
//         });
//     };
// }

// @Service()
// @EntityRepository(MHcoEntity)
// export class HcoRepository extends Repository<MHcoEntity> {
//     public findByEmail(hcoId: number) {
//         return this.findOne({ hcoId });
//     }
// }


// @Service()
// @ValidatorConstraint({ async: true })
// export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {

//     constructor(@Inject() private hcoRespository: HcoRepository) {
//         this.hcoRespository = hcoRespository
//     }

//     validate(hcoId: any, args: ValidationArguments) {
//         return this.hcoRespository.findByEmail(hcoId).then(user => {
//             if (user) return false;
//             return true;
//         });
//     }
// }


// export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
//     return function (object: Object, propertyName: string) {
//         registerDecorator({
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             constraints: [],
//             validator: IsUserAlreadyExistConstraint,
//         });
//     };
// }


// export class User {
//     @IsUserAlreadyExist({
//         message: 'User $value already exists. Choose another name.',
//     })
//     hcoId: number;
// }




// @Service()
// export class HcoRepository {
//   @InjectRepository(MHcoEntity)
//   private propertyInjectedRepository: Repository<MHcoEntity>;

//   constructor(@InjectRepository(MHcoEntity) private constructorInjectedRepository: Repository<MHcoEntity>) {}

//     public findByEmail(hcoId: number) {
//         return this.findOne({ hcoId });
//     }
// }


// @Service()
// export class PostService {
//   constructor(
//     @InjectRepository()
//     private readonly hcoRepository: HcoRepository
//   ) {}

//   public async userExist(user: User): Promise<boolean> {
//     return (await this.hcoRepository.findByEmail(user.hcoId)) ? true : false;
//   }
// }


@Service()
class InjectedExampleClass {
    print() {
        console.log('I am alive!');
    }
}

@Service()
class ExampleClass {
    constructor(
        @Inject()
        public withDecorator: InjectedExampleClass,
        public withoutDecorator: InjectedExampleClass
    ) { }
}

const instance = Container.get(ExampleClass);

/**
 * The `instance` variable is an ExampleClass instance with both the
 * `withDecorator` and `withoutDecorator` property containing an
 * InjectedExampleClass instance.
 */
console.log(instance);

instance.withDecorator.print();
// prints "I am alive!" (InjectedExampleClass.print function)
instance.withoutDecorator.print();
// prints "I am alive!" (InjectedExampleClass.print function)

async function main() {
    const connection = await createConnection({
        type: 'postgres',
        schema: 'cmd_owner',
        database: 'cmds',
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: 'Win2008',
        ssl: false,
        entities: [MHcoEntity]
    })

    // const r1 = Object.values(entities)
    // typeormUseContainer(Container)

    // validatorUseContainer(Container)
    // useContainer(Container)
    // Container.set('Validator', Validator);
    // let validator = getFromContainer(Validator)
    // validator = Container.get(Validator);
    // console.log('validator: ', validator);
    let r
    // const hcoRepository = Container.get(HcoRepository)
    // Container.set('hcoRepository', HcoRepository)
    // Container.set('IsUserAlreadyExistConstraint', IsUserAlreadyExistConstraint)
    // Container.set('PostService', PostService)
    // Container.set('user', User)

    // let user: User = Container.get('user')
    // console.log('user: ', user);

    // let validator = Container.get(Validator);

    // validate(user).then(errors => {
    //     if (errors.length > 0) {
    //         console.log('validation failed. errors: ', errors);
    //     } else {
    //         console.log('validation succeed');
    //     }
    // })

    console.log('r: ', r);




}

main()
    .then(response => {
        console.log('response: ', response);

    })
    .catch(e => {
        console.log('e: ', e);

    })
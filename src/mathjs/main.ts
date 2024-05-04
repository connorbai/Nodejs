import { Validator } from 'class-validator';
import 'reflect-metadata';
import { Container, Service } from 'typedi';
import {
    Repository
} from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from "./user";


@Service()
class PostService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  public async userExist(user: User): Promise<boolean> {
    const result =  await this.userRepository.find({where: {email: user.email}})
    return result ? true : false;
  }
}

// do this somewhere in the global application level:
// validatorUseContainer(Container);
let validator = new Validator();
Container.set(Validator, validator);


export async function AppMain() {
    const user = new User()
    user.email = '8'
    const postService = Container.get(PostService)
    const bool = await postService.userExist(user)
    console.log('------------bool-----------:', bool)
}



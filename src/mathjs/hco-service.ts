import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "./user";
import { Repository } from "typeorm";
import { zip, zipObject, zipWith } from "lodash";

@Service()
export class HcoService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  users: User[]
  usersMap: {[x: string]: User};

  public async userExist(user: User): Promise<boolean> {
    const result =  await this.userRepository.find({where: {email: user.email}})
    return result ? true : false;
  }

  public async hcoIdExist(hcoId) {
    if(!this.users) await this.loadHco()
    return !!this.usersMap[hcoId]
  }

  private async loadHco() {
    const users = await this.userRepository.query(`
        SELECT * FROM user;
    `)
    this.users = users
    this.usersMap = zipObject<User>(users.map(v => users.id), users)
  }


}
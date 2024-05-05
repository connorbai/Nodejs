import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "./user";
import { Repository } from "typeorm";
import { zip, zipObject, zipWith } from "lodash";
import { BaseService } from "./baseService";

@Service()
export class HcoService implements BaseService {

  users: User[]
  usersMap: {[x: string]: User};

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async init() {
    const users = await this.userRepository.find()
    this.users = users
    this.usersMap = zipObject<User>(users.map(v => v.name), users)
  };

  public userExist(name: string): boolean {
    const result = this.usersMap[name]
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
    
  }

}


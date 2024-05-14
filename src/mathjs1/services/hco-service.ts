import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entities/user";
import { Repository } from "typeorm";
import { zip, zipObject, zipWith } from "lodash";
import { BaseService } from "./baseService";
import { MHcoEntity } from "../entities/hco.entity";

@Service()
export class HcoService implements BaseService {

  hcos: MHcoEntity[]
  hcoMap: {[x: string]: MHcoEntity};

  @InjectRepository(MHcoEntity)
  private hcoRepository: Repository<MHcoEntity>;

  async init() {
    const hcos = await this.hcoRepository.find({ 
      where: { sttsInd: 1, isDeleted: false, clsfctnCd: 'C016' },
      select: ['hcoId', 'hcoCd']
    })
    this.hcos = hcos
    this.hcoMap = zipObject<MHcoEntity>(hcos.map(v => v.hcoId), hcos)
  };

  public hcoIdExist(hcoId) {
    return !!(this.hcoMap[hcoId] && this.hcoMap[hcoId])
  }

  private async loadHco() {
    const hcos = await this.hcoRepository.query(`
        SELECT * FROM cmd_owner.hco WHERE hco_id=1;
    `)
    this.hcos = hcos
  }
}


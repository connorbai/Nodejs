import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { zip, zipObject, zipWith } from "lodash";
import { BaseService } from "./baseService";
import { MHcpEntity } from "../entities/hcp.entity";

@Service()
export class HcpService implements BaseService {

  hcps: MHcpEntity[]
  hcpMap: {[x: string]: MHcpEntity};

  @InjectRepository(MHcpEntity)
  private hcpRepository: Repository<MHcpEntity>;

  async init() {
    const hcps = await this.hcpRepository.find({ 
      where: { sttsInd: 1, isDeleted: false, hcpId: 300016914 },
      select: ['hcpId', 'fullName'],
      take: 1000
    })
    this.hcps = hcps
    this.hcpMap = zipObject<MHcpEntity>(hcps.map(v => v.hcpId), hcps)
  };

  public hcpIdExist(hcpId) {
    return !!(this.hcpMap[hcpId])
  }

  private async loadHcp() {
    const hcps = await this.hcpRepository.query(`
        SELECT * FROM cmd_owner.hcp WHERE hcp_id=1;
    `)
    this.hcps = hcps
  }
}


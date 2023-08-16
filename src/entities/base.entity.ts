import { BaseEntity, Column, PrimaryGeneratedColumn, VersionColumn } from "typeorm";

export abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  public id: number;

  @Column({ name: "createduser", nullable: true })
  public createdUser?: string;

  @Column({ name: "createddate", type: "timestamp", nullable: true })
  public createdDate?: Date;

  @Column({ name: "modifieduser", nullable: true })
  public modifiedUser?: string;

  @Column({ name: "modifieddate", type: "timestamp", nullable: true })
  public modifiedDate?: Date;

  @Column({ name: "isdeleted", default: false })
  public isDeleted?: boolean;

  @VersionColumn({ name: "versionnumber", nullable: true })
  public versionNumber?: number;
}

export { BaseEntity };

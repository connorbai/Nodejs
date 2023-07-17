import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'temp_table', synchronize: false })
export class TempTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
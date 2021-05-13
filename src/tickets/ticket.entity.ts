import {
  Table,
  Column,
  Model,
  IsUUID,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

@Table
export class Ticket extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  due_date: Date;

  @Column
  status: string;

  @Column
  username: string;
}

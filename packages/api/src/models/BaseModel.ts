import { Column, Default, IsDate, Model, PrimaryKey } from 'sequelize-typescript';
import shortid from 'shortid';

export class BaseModel<T extends Model<T>> extends Model<T> {
  // Setup the primary key
  @PrimaryKey
  @Default(() => shortid())
  @Column
  id: string;

  @IsDate
  @Column
  createdAt: Date
}


import { AllowNull, Column, Table } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';


@Table
export class Module extends BaseModel<Module> {

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  description: string;

  @AllowNull(true)
  @Column
  previousModuleId: number;

  // ------------------------------------------------------------- Relationships

}

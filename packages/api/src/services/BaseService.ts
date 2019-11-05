import { BuildOptions } from 'sequelize';

import { ErrorResourceNotFound, handleSequelizeError } from '../errors';
import { BaseModel } from '../models/BaseModel';


export class BaseService<
  T extends BaseModel<any>,
  CreateInput,
  UpdateInput extends { id: string, [key: string]: any },
  FindAllArgs = { id: string },
  > {
  constructor(
    public model: typeof BaseModel
  ) { }

  async findById(id: string, throwError = true): Promise<T | null> {
    const resource = await this.model.findOne({
      where: { id }
    });
    if (!resource && throwError) throw new ErrorResourceNotFound(this.model.name, id);
    // @ts-ignore
    return resource;
  }

  async findAll({ }: FindAllArgs) {
    return await this.model.findAll() as T[];
  }

  async create(input: CreateInput, opts?: BuildOptions) {
    try {
      return await new this.model(input as unknown as object, opts).save() as T;
    } catch (e) {
      throw await handleSequelizeError(e);
    }
  }

  async updateOne({ id, ...input }: UpdateInput) {
    const updated = await this.model.update(input, {
      where: { id },
      limit: 1,
      returning: true
    });

    if (updated[1]) return updated[1][0] as T;
    return null;
  }
}

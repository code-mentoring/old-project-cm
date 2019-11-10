import { Arg, Authorized, Query, Resolver, Mutation } from 'type-graphql';

import { ModuleService, CreateModule } from '../../services/ModuleService';
import { EModule } from '../entities/ModuleEntity';

@Resolver(() => EModule)
export class ModuleResolver {

  @Authorized()
  @Query(() => EModule)
  async module(@Arg('id') id: string) {
    return ModuleService.findById(id);
  }

  @Mutation(() => EModule)
  @Authorized()
  async createModule(
    @Arg('createModuleInput') createModuleInput: CreateModule
  ) {
    return await ModuleService.create(createModuleInput);
  }

}

import { Arg, Authorized, Query, Resolver, Ctx } from 'type-graphql';

import { UserService } from '../../services/UserService';
import { EUser } from '../entities/UserEntity';
import { Context } from '../../lib/context';


@Resolver(EUser)
export class UserResolver {

  @Authorized()
  @Query(() => EUser)
  async user(@Arg('id') id: string) {
    return UserService.findById(id);
  }

  @Authorized()
  @Query(() => EUser)
  async me(@Ctx() ctx: Context) {
    return ctx.user;
  }
}

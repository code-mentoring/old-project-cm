import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';

import { Context } from '../../lib/context';
import { OAuthProvider } from '../../lib/OAuthProvider';
import { generateToken } from '../../lib/tokens';
import { github } from '../../server/middleware/oauth/github';
import { UserService } from '../../services/UserService';
import { EOauthCallbackInput, ETokenResult, EVerifyResult } from '../entities/OAuthEntity';


@Resolver()
export class OAuthResolver {
  @Query(() => ETokenResult)
  async oauthCallback(
    @Arg('details') { code, provider: providerName }: EOauthCallbackInput,
    @Ctx() ctx: Context
  ): Promise<ETokenResult> {
    let provider: OAuthProvider;
    if (providerName === 'github') provider = github;
    else throw new Error(`Invalid oauth provider ${providerName}`);

    let { user: socialUser } = await provider.getUser(code);

    const existing = await UserService.findByEmail(socialUser.email);
    const user = existing || await UserService.create(socialUser);

    const token = await generateToken(ctx.fingerprint, user);

    return token;
  }

  @Authorized()
  @Query(() => EVerifyResult)
  verify(): EVerifyResult {
    return { valid: true }
  }
}

import { CONFIG } from '../../../config';
import { OAuthProvider } from '../../../lib/OAuthProvider';


export const github = new OAuthProvider({
  provider: 'github',
  host: CONFIG.clientHost,
  clientID: CONFIG.oauth.github.appId,
  clientSecret: CONFIG.oauth.github.appSecret,
  authenticateURL: 'https://github.com/login/oauth/authorize',
  getTokenURL: 'https://github.com/login/oauth/access_token',
  getUserURL: 'https://api.github.com/user',
  getUserQueryString: {
    fields: 'id,email,first_name,last_name,picture'
  },
  mapUserData: {
    socialId: 'id',
    firstName: user => user.name.split(' ')[0],
    lastName: user => user.name.split(' ')[1],
    email: 'email',
    socialPic: 'avatar_url'
  }
});

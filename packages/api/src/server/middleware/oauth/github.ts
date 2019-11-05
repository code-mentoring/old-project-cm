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
    firstName: 'first_name',
    lastName: 'last_name',
    email: 'email',
    socialPic: 'picture.data.url'
  }
});

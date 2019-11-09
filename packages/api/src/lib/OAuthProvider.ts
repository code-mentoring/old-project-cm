import dot from 'dot-object';
import { NextFunction, Request, Response, Router } from 'express';
import request from 'request-promise-native';

import { ErrorAuthOauthCode } from '../errors';
import { CreateUser } from '../services/UserService';


const URI_PREFIX = '/oauth';


export interface ProviderOptions {
  host: string;
  provider: string;
  clientID: string;
  clientSecret: string;
  authenticateURL: string;
  authenticateQueryString?: object;
  getTokenURL: string;
  getUserURL: string;
  getUserQueryString?: object;
  mapUserData: MapUserData;
}

type MapUserDataValue = (user: any) => string;
export interface MapUserData {
  socialPic: string | MapUserDataValue;
  socialId: string | MapUserDataValue;
  firstName: string | MapUserDataValue;
  lastName: string | MapUserDataValue;
  email: string | MapUserDataValue;
}


export class OAuthProvider {
  public host: string;
  public provider: string;
  public router: Router;
  public clientID: string;
  public clientSecret: string;
  public authenticateURL: string;
  public authenticateQueryString?: object;
  public getTokenURL: string;
  public getUserURL: string;
  public getUserQueryString: object;
  public mapUserData: MapUserData;

  public socialUser?: CreateUser;

  constructor(options: ProviderOptions) {
    this.host = options.host;
    this.provider = options.provider;
    this.clientID = options.clientID;
    this.clientSecret = options.clientSecret;
    this.authenticateURL = options.authenticateURL;
    this.authenticateQueryString = options.authenticateQueryString || {};
    this.getTokenURL = options.getTokenURL;
    this.getUserURL = options.getUserURL;
    this.getUserQueryString = options.getUserQueryString || {};
    this.mapUserData = options.mapUserData;
    this.router = Router();
    this.router.get(`${URI_PREFIX}/${this.provider}`, this.authenticate.bind(this));
  }

  get callbackURL() {
    return `${this.host}${URI_PREFIX}/${this.provider}`;
  }

  /**
   * Redirect the user to the OAuth page for the provider to provide access.
   * This will redirect back again to the callback url with the OAuth code.
   * @param req Express Request
   * @param res Express Response
   * @param next Express NextFunction
   */
  public authenticate(
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const _qs = Object.entries({
      client_id: this.clientID,
      redirect_uri: this.callbackURL,
      scope: 'user:email',
      ...this.authenticateQueryString
    }).reduce((str, [k, v]) => {
      // tslint:disable-next-line
      str += `${k}=${v}&`;
      return str;
    }, '?');
    res.redirect(`${this.authenticateURL}${_qs}`);
  }

  public async getUser(code: string) {
    // Convert code to access token
    let token;
    try {
      token = await request({
        url: this.getTokenURL,
        method: 'POST',
        headers: { 'User-Agent': 'node' },
        json: true,
        qs: {
          client_id: this.clientID,
          redirect_uri: this.callbackURL,
          client_secret: this.clientSecret,
          code,
          grant_type: 'authorization_code'
        }
      });

    } catch (e) {
      if (e.error && e.error.error) throw new ErrorAuthOauthCode();
      else throw e;
    }

    if (token.error) throw new ErrorAuthOauthCode();

    const socialUser = await request({
      url: this.getUserURL,
      method: 'get',
      headers: { 'User-Agent': 'node' },
      json: true,
      qs: {
        access_token: token.access_token,
        ...this.getUserQueryString
      }
    });

    const pick = (prop: string | MapUserDataValue, user: any) => {
      if (typeof prop === 'string') {
        return dot.pick(prop, socialUser);
      }
      return prop(user);
    };


    if (!socialUser.email) {
      const [{ email }] = await request({
        url: 'https://api.github.com/user/emails',
        method: 'get',
        headers: { 'User-Agent': 'node' },
        json: true,
        qs: {
          access_token: token.access_token,
          ...this.getUserQueryString
        }
      });
      socialUser.email = email;
    }


    this.socialUser = {
      firstName: pick(this.mapUserData.firstName, socialUser),
      lastName: pick(this.mapUserData.lastName, socialUser),
      email: pick(this.mapUserData.email, socialUser),
      socialId: pick(this.mapUserData.socialId, socialUser),
      socialPic: pick(this.mapUserData.socialPic, socialUser)
    };

    return { user: this.socialUser, token: token.access_token };
  }
}

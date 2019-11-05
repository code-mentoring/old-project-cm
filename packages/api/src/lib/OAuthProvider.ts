import { NextFunction, Request, Response, Router } from 'express';
import request from 'request-promise-native';
import dot from 'dot-object';

import { CreateUser } from '../services/UserService';
import { ErrorBadRequest } from '../errors';

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

export interface MapUserData {
  socialPic: string;
  socialId: string;
  firstName: string;
  lastName: string;
  email: string;
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
      ...this.authenticateQueryString
    }).reduce((str, [k, v]) => {
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
      if (e.error && e.error.error) throw new ErrorBadRequest(e.error.error.message);
      else throw e;
    }


    const socialUser = await request({
      url: this.getUserURL,
      method: 'get',
      json: true,
      qs: {
        access_token: token.access_token,
        ...this.getUserQueryString
      }
    });

    this.socialUser = {
      firstName: dot.pick(this.mapUserData.firstName, socialUser),
      lastName: dot.pick(this.mapUserData.lastName, socialUser),
      email: dot.pick(this.mapUserData.email, socialUser),
      socialId: dot.pick(this.mapUserData.socialId, socialUser),
      socialPic: dot.pick(this.mapUserData.socialPic, socialUser)
    };

    return { user: this.socialUser, token: token.access_token };
  }


  // /**
  //  * Redirect to the final page with token in the query string
  //  * @param res Redirect from 3rd party with user data
  //  */
  // public async finalize(req: Request, res: Response, user: User) {
  //   if (!this.synthiaUser) return false;
  //   const fp = await fingerprint(req);
  //   const token = generateToken(fp, user);

  //   res.redirect(`${URI_PREFIX}/final?token=${token}`);
  // }
}


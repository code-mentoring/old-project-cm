import { Request } from 'express';
import geoip from 'geoip-lite';
import { x64 as hash } from 'murmurhash3js';
import traverse from 'traverse';
import useragent from 'useragent';

/**
 * Generate a unique fingerprint based on the user agent, IP, location, etc
 * @param req Request object
 */
export const fingerprint = (req: Request): string => {
  const agent = useragent.parse(req.headers['user-agent']);

  const acceptHeaders = {
    origin: req.headers['origin'],
    host: req.headers['host'],
    language: req.headers['accept-language']
  };
  const geo = geoip.lookup(req.ip);


  const leaves = traverse([agent, acceptHeaders, geo])
    .reduce(function (acc, x) {
      if (this.isLeaf) acc.push(x);
      return acc;
    }, []);


  return hash.hash128(leaves.join('---'));
};

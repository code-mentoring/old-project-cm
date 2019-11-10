const fs = require('fs');
const path = require('path');

module.exports.user = fs.readFileSync(path.join(__dirname, 'user.gql'), 'utf8');
module.exports.me = fs.readFileSync(path.join(__dirname, 'me.gql'), 'utf8');
module.exports.oauthCallback = fs.readFileSync(path.join(__dirname, 'oauthCallback.gql'), 'utf8');
module.exports.verify = fs.readFileSync(path.join(__dirname, 'verify.gql'), 'utf8');
module.exports.module = fs.readFileSync(path.join(__dirname, 'module.gql'), 'utf8');

export const environment = {
  production: false,

  apiUrl: 'http://192.168.1.104:8080',
  tokenWhitelistedDomains: [ new RegExp('localhost:8080') ],
  tokenBlackListdRoutes: [ new RegExp('\/oauth\/token') ]
};

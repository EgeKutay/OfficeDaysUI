let appConfig=require("@/appConfig.json")
export default {

  // Endpoints
  loginEndpoint: appConfig.AuthApi.loginEndPoint,
  registerEndpoint: '/jwt/register',
  refreshEndpoint: appConfig.AuthApi.loginViaRefreshTokenEndPoint,
  logoutEndpoint: '/jwt/logout',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
 
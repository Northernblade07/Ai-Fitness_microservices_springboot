export const authConfig = {
  clientId: 'oauth2-pkce-client',
  authorizationEndpoint: 'https://fitly-ai.duckdns.org/auth/realms/fitness-oauth2/protocol/openid-connect/auth',
  tokenEndpoint: 'https://fitly-ai.duckdns.org/auth/realms/fitness-oauth2/protocol/openid-connect/token',
  redirectUri: 'https://fitly-ai.duckdns.org/',
  scope: 'openid profile email offline_access',
  autoRefresh: true,
  onRefreshTokenExpire: (event) => event.logIn(),
}
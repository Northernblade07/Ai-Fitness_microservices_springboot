import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "fitly-ai.duckdns.org",
  realm: "fitness-oauth2",
  clientId: "oauth2-pkce-client"
});

export default keycloak;
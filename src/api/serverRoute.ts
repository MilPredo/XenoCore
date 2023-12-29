export const serverRoute = async () => {
  const serverConfigResponse = await fetch('/server_route.json');
  const serverConfig = await serverConfigResponse.json();
  const apiRoute = `http://${serverConfig.url}:${serverConfig.port}`;
  return apiRoute
}
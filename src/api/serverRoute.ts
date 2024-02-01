export const serverRoute = async () => {
  const serverConfigResponse = await fetch('/server_route.json');
  const serverConfig = await serverConfigResponse.json();
  const apiRoute = `http://${window.location.protocol + '//' + window.location.hostname}:${serverConfig.port}`;
  return apiRoute
}
const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  homePagePath: () => '/',
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
};

export default routes;

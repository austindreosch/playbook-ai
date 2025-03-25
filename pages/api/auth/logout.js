import { handleLogout } from '@auth0/nextjs-auth0';

export default async function logout(req, res) {
  try {
    await handleLogout(req, res, {
      returnTo: '/', // redirect after logout
      logoutParams: { federated: '' }, // clear Auth0 SSO session
    });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}

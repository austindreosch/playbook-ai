import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0';

export default function authMiddleware(req, res, next) {
  const { user } = getSession(req, res);

  if (!user) {
    res.writeHead(302, { Location: '/landing' });
    res.end();
    return;
  }

  next();
}

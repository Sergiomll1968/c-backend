import jwt from 'jsonwebtoken';
import * as usersService from '../api/users/users.service.js';

function unauthorized(res) {
  res.status(401);
  res.json('Unauthorized');
}

function middleware(req, res, next) {
  const publicRoutes = [
    '/login',
    '/register',
  ];

  const isPublicRoute = publicRoutes.some((publicRoute) => publicRoute === req.url);
  if (isPublicRoute) {
    next();
    return;
  }

  const token = req.headers.authorization;
  if (!token) {
    unauthorized(res);
    return;
  }

  jwt.verify(token, 'secretWord', async (error, payload) => {
    if (error) {
      console.error('ERROR!', error.message);
      return unauthorized(res);
    }

    req.user = await usersService.getByUsername({ username: payload.username });
    return next();
  });
}

export default middleware;

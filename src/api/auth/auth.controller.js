import * as authService from './auth.service.js';

export async function register(req, res) {
  const { username, password } = req.body;
  let token;

  if (!username || !password) {
    res.status(400);
    res.json('Wrong credentials');
    return;
  }

  try {
    token = await authService.register({ username, password });
  } catch (err) {
    const myError = JSON.parse(err.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }

  res.json({ token });
}

export async function login(req, res) {
  const { username, password } = req.body;
  let token;

  if (!username || !password) {
    res.status(400);
    res.json('Wrong credentials');
    return;
  }

  try {
    token = await authService.login({ username, password });
  } catch (err) {
    const myError = JSON.parse(err.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }

  res.json({ token });
}

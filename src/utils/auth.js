import baseUtils from './baseUtils';
class Auth extends baseUtils {
  constructor({ baseUrl, headers }) {
    super({ baseUrl, headers });
  }
  // 1. проверим токен из app
  checkToken(token) {
    return this._request('/users/me', {
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }, `POST checkToken ${!token} - `);
  }
  // 2. Зарегистрируемся
  register({name, email, password }) {
    return this._request('/signup', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    }, `POST ${name}, ${email} and input password - `);
  }
  // 3. Залогинимся
  signIn({ email, password }) {
    return this._request('/signin', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ email, password })
    }, `POST ${email} and input password - `);
  }
}

const auth = new Auth ({
  baseUrl: 'https://api.elkod.nomoredomainsicu.ru',
  //baseUrl: 'http://127.0.0.1:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default auth;

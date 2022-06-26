import cookie from 'cookie';

// dependency cookie is for the backend, cookie.js is front-end

export function createSerializedRegisterSessionTokenCookie(token: string) {
  // check if we are in production e.g Heroku - yarn dev opens in production therefore not required as http required for delevopment but https for implimentation
  const isProduction = process.env.NODE_ENV === 'production';

  const maxAge = 60 * 60 * 24; // 24 hours converted into seconds

  return cookie.serialize('sessionToken', token, {
    // new browsers
    maxAge: maxAge, // in seconds
    // for ie and old browsers
    expires: new Date(
      Date.now() /* current date in milliseconds */ +
        maxAge * 1000 /* 24  hours in milliseconds */,
    ), // in date format
    httpOnly: true,
    secure: isProduction,
    path: '/',
    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax',
  });
}

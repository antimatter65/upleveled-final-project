import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import { logoutOfSession } from '../utls/database';

export function Logout() {
  return null;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  // if there is a token, delete the session and set cookie for destruction
  if (token) {
    await logoutOfSession(token);

    context.res.setHeader(
      'Set-Cookie',
      cookie.serialize('sessionToken', '', {
        maxAge: -1,
        path: '/',
      }),
    );
  }
  // set session cookie to empty and expire it as soon as you create it

  return {
    redirect: {
      destination: `/`,
      permanent: false,
    },
  };
}

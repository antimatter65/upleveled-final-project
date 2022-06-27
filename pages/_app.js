import { css, Global } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';

//import { User } from '../utls/database';

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

  // console.log('hey', user);

  // callback used so only created one time - optimisation

  const refreshUserProfile = useCallback(async () => {
    const profileResponse = await fetch('/api/profile');
    const profileResponseBody = await profileResponse.json();

    if (!('errors' in profileResponseBody)) {
      setUser(profileResponseBody.user);
    } else {
      profileResponseBody.errors.forEach((error) => console.log(error.message));
      setUser(undefined);
    }
  }, []);

  // async function refreshUserProfile() {
  //   const profileResponse = await fetch('/api/profile');
  //   const profileResponseBody = await profileResponse.json();

  //   if (!('errors' in profileResponseBody)) {
  //     setUser(profileResponseBody.user);
  //     // console.log('hey2', profileResponseBody);
  //   } else {
  //     profileResponseBody.errors.forEach((error) => console.log(error.message));
  //     setUser(undefined);
  //   }
  // }

  useEffect(() => {
    refreshUserProfile().catch(() => console.log('fetch api failed'));
  }, []);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            text-decoration: none;
            padding: 0px;
            margin-left: 0px;
            margin-right: 0px;
            font-family: Dosis, -apple-system, BlinkMacSystemFont, Segoe UI,
              Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
              Helvetica Neue, sans-serif;
            background-color: white;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }
        `}
      />
      <Layout user={user} refreshUserProfile={refreshUserProfile}>
        <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
      </Layout>
    </>
  );
}

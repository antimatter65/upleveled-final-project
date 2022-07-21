import '../styles/menu.css';
import '../styles/carousel.css';
import '../styles/slider.css';
import { css, Global } from '@emotion/react';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

  // for multiple layouts

  // const getLayout = Component.getLayout || ((page) => page);

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

  useEffect(() => {
    refreshUserProfile().catch(() => console.log('fetch api failed'));
  }, [refreshUserProfile]);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            text-decoration: none;
            padding: 0%;
            padding-top: 0%;
            margin-left: 0%;
            margin-top: 0%;
            margin-right: 0%;
            font-family: Lexend Zetta, sans-serif, Dosis, -apple-system,
              BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
              Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }
          body {
            background-color: #efefef;
          }
        `}
      />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user} refreshUserProfile={refreshUserProfile}>
        <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
      </Layout>
    </>
  );
}

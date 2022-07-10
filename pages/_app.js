import '../styles/menu.css';
import { css, Global } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';

// import { User } from '../utls/database';

// const backgroundImageStyles = css`
//   z-index: -0;
//   width: 1%;
//   opacity: 0.5;
// `;

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

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
            padding: 0%;
            margin-left: 0%;
            margin-right: 0%;
            font-family: Lexend Zetta, sans-serif, Dosis, -apple-system,
              BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
              Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            background-color: white;
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

      <div>a</div>
      <Layout user={user} refreshUserProfile={refreshUserProfile}>
        {/*         <div ccs={backgroundImageStyles}>
          <Image src={darkbackground1} />
        </div> */}
        <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
      </Layout>
    </>
  );
}

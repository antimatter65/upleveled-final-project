import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LoginResponseBody } from './api/login';
import { errorStyles } from './register';
import { buttonStyles } from './releases';

const signInBoxStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  padding-left: 5%;
  padding-top: 5%;
  color: white;
  max-width: 75%;
  font-size: 24px;
  text-shadow: 1px 1px 1px #3c5c5e;
  @media (max-width: 1000px) {
    margin-top: 15%;
  }
`;

const signInBoxStyles1 = css`
  padding-left: 5%;
  padding-top: 5%;
  padding-bottom: 5%;
  z-index: 11;
`;

const inputBoxStyles = css`
  width: 50%;
  height: 1.5vw;
  opacity: 0.6;
  margin-left: 5%;
  font-size: 24px;
  color: greenyellow;
  background-color: grey;
  @media (max-width: 1000px) {
    width: 100%;
    height: 100%;
    margin: 5%;
  }
`;

export default function About(props: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<
    {
      message: string;
    }[]
  >([]);

  const router = useRouter();

  async function loginHandler() {
    const registerResponse = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const loginResponseBody: LoginResponseBody = await registerResponse.json();

    console.log(loginResponseBody);

    // if we have an error - show error message

    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      return;
    }
    // retrunTo is equal to the current page before logging in
    const returnTo = router.query.returnTo;

    if (
      returnTo &&
      !Array.isArray(returnTo) &&
      // (validate expected returnTo as this is untrusted user input)
      // the is to make sure javescript can not be run in the url bar via the return to
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      await router.push(returnTo);
      // props.refreshUserProfile so username appears in header
      await props.refreshUserProfile;
    } else {
      // direct user to home after registering or other page in this case redirect to user profile based on user.id
      // await router.push(`/users/${loginResponseBody.user.id}`);
      await router.push(`/users/private-page`);
      // await router.push('/');
    }
  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="Login" content="Login a user" />
      </Head>

      <main>
        <div css={signInBoxStyles1}>
          <h1 css={signInBoxStyles}>Login:</h1>
          <section css={signInBoxStyles}>
            <br />
            <br />
            <br />
            <br />
            <label>
              Username:
              <input
                css={inputBoxStyles}
                value={username}
                onChange={(event) => {
                  setUsername(event.currentTarget.value);
                }}
              />
            </label>
            <br />
            <label>
              Password :
              <input
                css={inputBoxStyles}
                value={password}
                type="password"
                onChange={(event) => {
                  setPassword(event.currentTarget.value);
                }}
              />
            </label>
            <br />
            <br />
            <button css={buttonStyles} onClick={() => loginHandler()}>
              Login
            </button>
            <br />
            {errors.map((error) => (
              <div css={errorStyles} key={`error-${error.message}`}>
                {error.message}
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

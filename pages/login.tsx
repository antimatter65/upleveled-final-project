import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LoginResponseBody } from './api/login';
import { errorStyles } from './register';

const signInBoxStyles = css`
  padding-left: 5%;
`;

const signInBoxStyles1 = css`
  padding-left: 5%;
  border: 1px black solid;
  padding-top: 5%;
  padding-bottom: 5%;
`;

export default function About() {
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
    } else {
      // direct user to home after registering or other page in this case redirect to user profile based on user.id
      await router.push(`/users/${loginResponseBody.user.id}`);
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
            <label>
              username:
              <input
                value={username}
                onChange={(event) => {
                  setUsername(event.currentTarget.value);
                }}
              />
            </label>
            <br />
            <br />
            <label>
              password:
              <input
                value={password}
                onChange={(event) => {
                  setPassword(event.currentTarget.value);
                }}
              />
            </label>
            <br />
            <br />
            <button onClick={() => loginHandler()}>Login</button>
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

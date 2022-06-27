import { css } from '@emotion/react';
// import { request } from 'https';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RegisterResponseBody } from './api/register';

export const errorStyles = css`
  color: white;
  background-color: #f37c7c;
`;

const signInBoxStyles = css`
  padding-left: 5%;
`;
const signInBoxStyles1 = css`
  padding-left: 5%;
  border: 1px black solid;
  padding-top: 5%;
  padding-bottom: 5%;
`;

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<
    {
      message: string;
    }[]
  >([]);

  // custom hook used to
  const router = useRouter();

  async function registerHandler() {
    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const registerResponseBody: RegisterResponseBody =
      await registerResponse.json();

    console.log(registerResponseBody);

    // if we have an error - show error message

    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
      return;
    }

    // direct user to home after registering or other page

    // await router.push(`/`);

    // await router.push(`/users/${registerResponseBody.user.id}`);

    // returnTo is equal to the current page before logging in
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
      // direct user to home after registering or other page as required
      await router.push(`/`);
    }
  }

  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="registration" content="registration" />
      </Head>

      <main>
        <div css={signInBoxStyles1}>
          <h1 css={signInBoxStyles}>New User : Create Account</h1>
          <section css={signInBoxStyles}>
            <label>
              Username:
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
              Password:
              <input
                value={password}
                onChange={(event) => {
                  setPassword(event.currentTarget.value);
                }}
              />
            </label>
            <br />
            <br />
            <button onClick={() => registerHandler()}>Register</button>
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

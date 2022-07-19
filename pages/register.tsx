import { css } from '@emotion/react';
// import { request } from 'https';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RegisterResponseBody } from './api/register';
import { buttonStyles } from './releases';

export const errorStyles = css`
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #f37c7c;
  max-width: 50%;
  border-radius: 15px;
  font-size: 16px;
  display: flex;
  position: relative;
  justify-content: center;
  margin-left: 22%;
`;

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
    justify-content: center;
  }
`;

const signInBoxStyles1 = css`
  padding-left: 5%;
  padding-top: 5%;
  padding-bottom: 5%;
  z-index: 11;
  text-shadow: 1px 1px 1px #3c5c5e;
`;

const inputBoxStyles = css`
  width: 50%;
  height: 1.5vw;
  opacity: 0.75;
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

// const buttonStyles = css`
//   width: 10%;
//   height: 50px;
//   margin-left: 60%;
//   border-radius: 15px;
//   opacity: 0.5;
//   background-color: greenyellow;
//   color: black;
//   font-size: 24px;
// `;

export default function Register(props: any) {
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
      // the is to make sure javascript can not be run in the url bar via the return to
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      await router.push(returnTo);
    } else {
      // direct user to home after registering or other page as required
      await props.refreshUserProfile();
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
                css={inputBoxStyles}
                value={username}
                onChange={(event) => {
                  setUsername(event.currentTarget.value);
                }}
              />
            </label>
            <br />
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
            <button css={buttonStyles} onClick={() => registerHandler()}>
              Register
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

import { request } from 'https';
import Head from 'next/head';
import { useState } from 'react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

    const registerResponseBody = await registerResponse.json();

    console.log(registerResponseBody);
  }

  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="registration" content="registration" />
      </Head>

      <main>
        <h1>Registration Page</h1>
        <label>
          username:
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.currentTarget.value);
            }}
          />
        </label>
        <label>
          password:
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
          />
        </label>
        <button onClick={() => registerHandler()}>Register</button>
      </main>
    </div>
  );
}

import { css } from '@emotion/react';
import Head from 'next/head';

const mainVideoStyles = css`
  margin: 10%;
  margin-top: 5%;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="add tour dates" content="input for future tour dates" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section css={mainVideoStyles}>
          <h1>Add Live & DJ:</h1>
          <div>something</div>
        </section>
      </main>
    </div>
  );
}

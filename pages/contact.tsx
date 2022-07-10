import { css } from '@emotion/react';
import Head from 'next/head';
// import Image from 'next/image';
// import { useEffect } from 'react';
import styles from '../styles/Home.module.css';

const mainStyles = css`
  margin: 10%;
  margin-top: 5%;
`;

const titleStyles = css`
  margin-left: 600px;
  color: #e499d1;
`;

export default function Contact() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta
          name="contact and booking"
          content="contact and booking information for locoda"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <br />
        <h1 css={titleStyles}>Contact and Bookings:</h1>
        <hr />
        <section css={mainStyles}>
          <div>For Booking and Inquires please contact:</div>
          <div>locodabookings@email.com</div>
        </section>
      </main>
    </div>
  );
}

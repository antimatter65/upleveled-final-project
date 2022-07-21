import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaTools } from 'react-icons/fa';

// import styles from '../styles/Home.module.css';

const bgText = css`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 5%;
  font-size: 24px;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;
  z-index: 0;
`;

const iconStyles = css`
  margin: 8%;
  padding: 1%;
  color: white;
  opacity: 0.75;
  width: 200px;
  height: 200px;
  :hover {
    color: black;
  }
`;

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Contact(props: Props) {
  useEffect(() => {
    props.refreshUserProfile().catch(() => console.log('refresh user profile'));
  }, [props]);

  return (
    <div>
      <Head>
        <title>LOCODA | Under Construction</title>
        <meta name="placeholder" content="under construction placeholder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={bgText}>
        <h2>Whoops!</h2>
        <div>This Page Is Under Construction</div>
        <Link href="/">
          <FaTools css={iconStyles} />
        </Link>
        <br />
      </main>
    </div>
  );
}

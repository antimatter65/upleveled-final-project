import { css } from '@emotion/react';
import Head from 'next/head';
import { useEffect } from 'react';

const bgText = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: none;
  margin: 0;
  font-size: 2rem;
  line-height: 3rem;
  padding-top: 25vh;
  padding-bottom: 30vh;
  text-shadow: 1px 1px 1px #3c5c5e;
  z-index: 1;
  opacity: 0.75;
  color: white;
`;

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Home(props: Props) {
  useEffect(() => {
    props.refreshUserProfile().catch(() => console.log('refresh user profile'));
  }, [props]);

  return (
    <div>
      <Head>
        <title>LOCODA | Merch</title>
        <meta
          name="Merch Page"
          content="Merch Coming Soon from Locoda Drum and Bass Artist/Dj/Producer from the Manchester UK "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p css={bgText}>
        {/* <h1 css={titleStyles}>Merch</h1> */}
        <div>Locoda Mech Coming Soon</div>
        <br />
        <div>check back later for more info</div>
      </p>
    </div>
  );
}

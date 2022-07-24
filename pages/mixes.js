import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaMixcloud } from 'react-icons/fa';
// import Link from 'next/link';
// import two from '../public/2.jpeg';
import three from '../public/3.jpg';
import four from '../public/4.jpg';
import theoneinthewoodslogo2 from '../public/theoneinthewoodslogo2.jpg';

const mainStyles = css``;

const titleStyles = css`
  display: flex;
  position: relative;
  color: white;
  justify-content: center;
  text-shadow: 1px 1px 1px #3c5c5e;
  margin-bottom: 5%;
  @media (max-width: 1000px) {
    margin-top: 25%;
  }
`;

const carouselContainerStyles = css`
  display: flex;
  position: relative;
  align-items: center;
  align-self: center;
  justify-content: center;
  padding-top: 5%;
`;

const imageCarouselStyles = css`
  display: flex;
  position: relative;
  width: 50%;
  height: 50%;
  border-radius: 15px;
  object-fit: cover;
  align-items: center;
  z-index: 12;
`;

const mixcloudPlayerStyles = css`
  display: flex;
  position: relative;
  border-radius: 15px;
  // color: #fe5670;
`;

const footerStyles = css`
  display: flex;
  position: relative;
  color: white;
  justify-content: center;
  align-items: center;
  text-shadow: 1px 1px 1px #3c5c5e;
  flex-direction: column;
  margin-top: 80%;
  @media (max-width: 1000px) {
    margin-top: 100%;
    margin-bottom: 0%;
  }
`;

const iconStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  margin-left: 3%;
  margin-right: 3%;
  padding: 1%;
  color: white;
  opacity: 0.75;
  width: 75px;
  height: 75px;
  :hover {
    color: black;
  }
  @media (prefers-color-scheme: light) {
    color: #57387f;
    :hover {
      color: white;
    }
  }
`;

export function IframeSecure({ title, sandbox, ...restProps }) {
  return <iframe title={title} sandbox={sandbox} {...restProps} />;
}

export default function mixesList() {
  return (
    <div>
      <Head>
        <title>LOCODA | Mixes</title>
        <meta
          name="description"
          content="Dj Sets ad mixes from Mixcloud / Soundcloud from Locoda Drum and Bass Artist/Dj/Producer from the Manchester UK "
        />
        <link rel="icon" href="/favicon.ico" /><meta
          name="keywords" content="Locoda, Drum and Bass, DnB, Drum and Bass, Manchester, DJ, Producer, Code Recordings"/>
      </Head>
      <main css={mainStyles}>
        <h1 css={titleStyles}>Mixes</h1>
        <section css={carouselContainerStyles}>
          <div className="container">
            <input type="radio" name="slider" id="item-1" checked />
            <input type="radio" name="slider" id="item-2" />
            <input type="radio" name="slider" id="item-3" />
            <input type="radio" name="slider" id="item-4" />
            <div className="cards">
              <label className="card" htmlFor="item-1" id="song-1">
                <Image src={theoneinthewoodslogo2} css={imageCarouselStyles} />
                {/* <iframe

                /> */}
                <IframeSecure
                  css={mixcloudPlayerStyles}
                  title="mix1"
                  width="100%"
                  height="120"
                  src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Flocoda%2Flocoda-live-the-one-in-the-woods-2021%2F"
                  frameBorder="0"
                  // empty sandbox to remove eslint errors
                  sandbox="allow-scripts allow-same-origin"
                />
              </label>
              <label className="card" htmlFor="item-2" id="song-2">
                <Image src={four} css={imageCarouselStyles} />
                <IframeSecure
                  css={mixcloudPlayerStyles}
                  title="mix2"
                  width="100%"
                  height="120"
                  src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Flocoda%2Fliquid-mini-mix-002%2F"
                  frameBorder="0"
                  sandbox
                />
              </label>
              <label className="card" htmlFor="item-3" id="song-3">
                <Image src={three} css={imageCarouselStyles} />
                <br />
                <IframeSecure
                  css={mixcloudPlayerStyles}
                  title="mix3"
                  width="100%"
                  height="120"
                  src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Flocoda%2Fliquid-mini-mix-001%2F"
                  frameBorder="0"
                  sandbox="allow-scripts allow-same-origin"
                />
              </label>
              <section css={footerStyles}>
                <div>See more mixes here on mixcloud:</div>
                <Link href="https://www.mixcloud.com/locoda/">
                  <FaMixcloud css={iconStyles} />
                </Link>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

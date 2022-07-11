import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import aboutbackground from '../public/aboutbackground.jpeg';
import { getAboutInfo } from '../utils/database';

const mainTextStyles = css`
  margin: 1%;
  margin-top: 5%;
  color: grey;
`;

const backgroundImageStyles = css`
  display: flex;
  position: fixed;
  align-items: center;
  align-self: center;
  width: 90%;
  padding: 8%;
  padding-top: 0;
  position: fixed;
  align-items: center;
  height: 80vh;
  width: 90vw;
  overflow: hidden;
  z-index: -1;
`;

const titleStyles = css`
  margin-left: 600px;
  z-index: 0;
  color: white;
`;

const releasesListStyles = css`
  display: flex;
  position: absolute;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1%;
  margin: 1%;
  justify-content: flex-start;
  justify-content: space-evenly;
  max-height: 100%;
`;

const releasesListItemLinkStyles = css`
  color: #ffffff;
  margin: 20%;
  flex-direction: column;
  .a {
    color: green;
  }
`;

export default function releaseList(props) {
  return (
    <div>
      <Head>
        <title>ABOUT</title>
        <meta name="description" content="all locoda tour dates" />
        {/* <link rel="icon" href="/faviconmixtape.png" /> */}
      </Head>
      <h1 css={titleStyles}>About</h1>
      <main>
        <div css={releasesListStyles}>
          <div css={backgroundImageStyles}>
            <Image
              src={aboutbackground}
              alt="bridges and canals in Manchester at night"
              width="1200"
              height="800"
            />
          </div>
          {props.aboutInfo.map((about) => {
            return (
              <div key={`release-${about.id}`} css={releasesListItemLinkStyles}>
                <div>{about.paragraph1}</div>
                <br />
                <div> {about.paragraph2}</div>
                <br />
                <div> {about.paragraph3}</div>
                <br />
                <div>{about.paragraph4}</div>
                <br />
                <div>{about.externalLink1}</div>
                <br />
                <div>{about.externalLink2}</div>
                <br />
                <div>{about.externalLink3}</div>
              </div>
            );
          })}
        </div>
        <div>
          <div>Credit where it's due. We always hurt the ones we love.</div>
        </div>
      </main>
    </div>
  );
}

// Code in getServerSideProps runs in
// Node.js (on the server)
//
// Important: ONLY in the /pages directory
export async function getServerSideProps() {
  // from database.js
  const aboutInfo = await getAboutInfo();

  return {
    // Anything that you pass in the props
    // object will get passed to the component
    // at the top in the `props` parameter
    props: {
      // releases.: releases.Database,
      aboutInfo: aboutInfo,
    },
  };
}

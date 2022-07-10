import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import aboutbackground from '../public/aboutbackground.jpeg';
import styles from '../styles/Home.module.css';
import { getAboutInfo, getTourDates } from '../utils/database';

const mainTextStyles = css`
  margin: 1%;
  margin-top: 5%;
  color: grey;
`;

const backgroundImageStyles = css`
  width: 90%;
  padding: 5%;
`;

const titleStyles = css`
  margin-left: 600px;
`;

const releasesListStyles = css`
  display: flex;
  position: relative;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px;
  margin: 30px;
  justify-content: flex-start;
  justify-content: space-evenly;
  border: 1px solid black;
`;

const releasesListItemStyles = css`
  border: solid black 1px;
  margin: 10px;
  padding: 30px;
  background-color: white;

  align-items: center;
  width: 75%;
  box-shadow: #5e5df0 0 10px 20px -10px;
  .div {
    display: flex;
    position: relative;
    flex-direction: row;
    //justify-content: space-between;
    margin: 30px;
    background: #fdfdfd;
    font-size: 13px;
    height: 500px;
    width: 500px;
    padding: 10px 16px;
    margin: 20px;
    border: solid black 10px;
    box-shadow: #5e5df0 0 10px 20px -10px;
  }
`;

const releasesListItemLinkStyles = css`
  color: #ffffff;
  border: 1px solid black;
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
      <hr />

      <main>
        <div css={releasesListStyles}>
          <div css={backgroundImageStyles}>
            <Image
              src={aboutbackground}
              alt="bridges and canals in Manchester at night"
              // width="600"
              // height="400"
            />
          </div>
          {props.aboutInfo.map((about) => {
            return (
              <div key={`release-${about.id}`} css={releasesListItemLinkStyles}>
                <div>{about.paragraph1}</div>
                <br />
                <br />
                <div> {about.paragraph2}</div>
                <br />
                <br />
                <div> {about.paragraph3}</div>
                <br />
                <br />
                <div>{about.paragraph4}</div>
                <br />
                <div>{about.externalLink1}</div>
                <br />
                <br />
                <div>{about.externalLink12}</div>
                <br />
                <br />
                <div>{about.externalLink3}</div>
                <br />
                <br />

                {/* <Link href={`/releases/${release.id}`}>
                  <Image src={`/${release.id}.jpeg`} width="600" height="400" />
                </Link> */}
              </div>
            );
          })}
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

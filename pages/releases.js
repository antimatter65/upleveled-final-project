import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
// import mixtape1 from '../public/mixtape1.png';
import { getReleases } from '../utils/database';

// import { releases.Database } from '../util/database';

const titleStyles = css`
  display: flex;
  position: relative;
  color: white;
  justify-content: center;
`;

const releasesListStyles = css`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;

  margin: 7%;
  justify-content: flex-start;
  justify-content: space-evenly;
  border: blueviolet 3px solid;
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
  display: flex;
  flex-direction: column;
  color: white;
  text-decoration: wavy;
  .a {
    color: green;
  }
`;

const linkStyles = css`
  display: flex;
  flex-direction: row;
`;

const albumArtStyles = css`
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

export default function releaseList(props) {
  return (
    <div>
      <Head>
        <title>Releases</title>
        <meta name="description" content="all locoda releases" />
        {/* <link rel="icon" href="/faviconmixtape.png" /> */}
      </Head>
      <h1 css={titleStyles}>Releases</h1>

      <main>
        <div css={releasesListStyles}>
          {props.releases
            .sort((a, b) => a.id - b.id)
            .map((release) => {
              return (
                <div
                  key={`release-${release.id}`}
                  css={releasesListItemLinkStyles}
                >
                  <div css={release.ListItemLinkStyles}></div>
                  {/* <div>Length: {releases.release_date}</div> */}
                  <Link href={`/releases/${release.id}`}>
                    <div>Name: {release.releaseName}</div>
                  </Link>
                  <br />
                  <div>Number of Tracks: {release.tracks}</div>
                  <br />
                  <div>Label: {release.recordLabel}</div>
                  <br />
                  <div>Released: {release.releaseDate}</div>
                  <br />
                  {/* <div>Cover Art Link: {release.coverArtLink}</div> */}
                  <div css={albumArtStyles}>
                    <Link href={`/releases/${release.id}`}>
                      <Image
                        src={`/${release.id}.jpeg`}
                        width="700"
                        height="700"
                      />
                    </Link>
                  </div>
                  <br />
                  <div css={linkStyles}>
                    <Link href={release.buyLink}>Beatport</Link>
                    <Link href={release.streamingLink}>Stream</Link>
                    <Link href={release.bandcampLink}>Bandcamp</Link>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
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

// Important: ONLY in the /pages directory
export async function getServerSideProps() {
  // from database.js
  const releases = await getReleases();

  return {
    // Anything that you pass in the props
    // object will get passed to the component
    // at the top in the `props` parameter
    props: {
      // releases.: releases.Database,
      releases: releases,
    },
  };
}

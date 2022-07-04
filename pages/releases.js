import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
// import mixtape1 from '../public/mixtape1.png';
import { getReleases } from '../utils/database';

// import { releases.Database } from '../util/database';

const titleStyles = css`
  margin-left: 600px;
`;

const releasesListStyles = css`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  padding: 10px;
  margin: 30px;
  justify-content: flex-start;
  justify-content: space-evenly;
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
  color: grey;
  text-decoration: underline;
  .a {
    color: green;
  }
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
      <hr />

      <main>
        <div css={releasesListStyles}>
          {props.releases.map((release) => {
            return (
              <div
                key={`release-${release.id}`}
                css={releasesListItemLinkStyles}
              >
                <div css={release.ListItemLinkStyles}>
                  {/* <Link href={`/releases/${releases.id}`}>
                    {releases.release_name}
                  </Link> */}
                </div>
                {/* <div>Length: {releases.release_date}</div> */}
                <div>Name: {release.releaseName}</div>
                <br />
                <div>Number of Tracks: {release.tracks}</div>
                <br />
                <div>Record Label: {release.recordLabel}</div>
                <br />
                <div>Release Date: {release.releaseDate}</div>
                <br />
                <div>Cover Art Link: {release.coverArtLink}</div>
                <br />
                <div>Beatport Link: {release.buyLink}</div>
                <br />
                <div>Streaming Link: {release.streamingLink}</div>
                <br />
                <div>Bandcamp Link: {release.bandcampLink}</div>
                <br />
                <Link href={`/releases/${release.id}`}>
                  <Image src={`/${release.id}.jpeg`} width="600" height="400" />
                </Link>
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

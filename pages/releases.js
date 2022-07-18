import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { BsSpotify } from 'react-icons/bs';
import { SiBandcamp, SiBeatport } from 'react-icons/si';
import { getReleases } from '../utils/database';

// import { releases.Database } from '../util/database';

export const titleStyles = css`
  display: flex;
  position: relative;
  color: white;
  justify-content: center;
  text-shadow: 1px 1px 1px #3c5c5e;
  @media (max-width: 1000px) {
    margin-top: 20%;
    align-items: center;
    justify-content: center;
  }
`;

const releasesListStyles = css`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1%;
  justify-content: flex-start;
  justify-content: space-evenly;
`;

const releasesTextStyles = css`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-direction: column;
  font-size: 16px;
  margin-left: 2%;
  padding-left: 5%;
  height: auto;
  padding-right: 30%;
  justify-content: flex-start;
  justify-content: space-evenly;
  background-color: grey;
  border-bottom: 1px solid greenyellow;
  opacity: 0.75;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;
  @media (max-width: 1000px) {
    width: 90%;
    justify-content: center;
    align-items: center;
  }
`;

const releasesListItemLinkStyles = css`
  display: flex;
  position: relative;
  flex-direction: row;
  margin-top: 13%;
  margin-bottom: 13%;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const linkStyles = css`
  padding-left: 25%;
  display: flex;
  flex-direction: row;
`;

const albumArtStyles = css`
  display: flex;
  position: relative;
  padding: 0%;
  width: 100%;
  box-shadow: -5px -15px 50px 15px #aaaaaa;
  border-radius: 15px;
  margin-left: 5%;
  @media (max-width: 1000px) {
    width: 50%;
  }
`;

const iconTitleStyles = css`
  padding: 5%;
  margin: 5%;
  padding-left: 10%;
`;

export const iconStyles = css`
  margin-left: 3%;
  margin-right: 3%;
  padding: 5%;
  color: white;
  opacity: 0.75;
  width: 50px;
  height: 50px;
  :hover {
    color: black;
  }
`;

export const iconsSectionStyles = css`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  color: white;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const buttonStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 1%;
  font-family: Lexend Zetta;
  font-size: 10px;
  width: 30%;
  height: 30px;
  display: flex;
  flex-direction: column;
  background-color: greenyellow;
  color: black;
  opacity: 0.75;
  border-radius: 15px;
  box-shadow: gold;
  :hover {
    color: greenyellow;
    background-color: black;
  }
  @media (prefers-color-scheme: light) {
    color: #57387f;
    background-color: white;
    :hover {
      background-color: #57387f;
      color: white;
    }
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
                  <div css={albumArtStyles}>
                    <Link href={`/releases/${release.id}`}>
                      <Image
                        src={`/${release.id}.jpeg`}
                        width="900"
                        height="900"
                      />
                    </Link>
                  </div>
                  <section css={releasesTextStyles}>
                    <div css={release.ListItemLinkStyles} />
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
                    <button css={buttonStyles}>
                      <Link href={`/releases/${release.id}`}>
                        <div>More Info</div>
                      </Link>
                    </button>
                    {/* <div>Cover Art Link: {release.coverArtLink}</div> */}
                    <div css={linkStyles}>
                      <section css={iconsSectionStyles}>
                        <div css={iconTitleStyles}>
                          Beatport:
                          <br />
                          <Link href={release.buyLink}>
                            <SiBeatport css={iconStyles} />
                          </Link>
                        </div>
                        <div css={iconTitleStyles}>
                          Stream:
                          <Link href={release.streamingLink}>
                            <BsSpotify css={iconStyles} />
                          </Link>
                        </div>
                        <br />
                        <div css={iconTitleStyles}>
                          Bandcamp:
                          <Link href={release.bandcampLink}>
                            <SiBandcamp css={iconStyles} />
                          </Link>
                        </div>
                      </section>
                    </div>
                  </section>
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

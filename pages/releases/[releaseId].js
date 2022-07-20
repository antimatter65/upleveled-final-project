import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { BsSpotify } from 'react-icons/bs';
import { SiBandcamp, SiBeatport } from 'react-icons/si';
import { getReleaseByReleaseId } from '../../utils/database';
import { getReducedRelease } from '../../utils/dataStructure';

const mainReleaseStyles = css`
  font-size: 13px;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  padding-top: 5%;
  justify-items: center;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;
  @media (max-width: 1000px) {
    margin-top: 10%;
  }
`;

const albumArtStyles = css`
  display: flex;
  position: relative;
  padding: 0%;
  margin: 0%;
  width: 25%;
  /* box-shadow: -5px -15px 50px 15px #aaaaaa; */

  @media (max-width: 1000px) {
    width: 90%;
    margin-bottom: 5%;
  }
`;

const sectionStyles = css`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  // background-color: white;
  height: 600px;
  // border: black 1px solid;
  justify-content: center;
  width: 60%;
  font-size: 13px;
  text-shadow: 1px 1px 1px #3c5c5e;
  @media (max-width: 1000px) {
    font-size: 12px;
  }
`;

const trackDataStyles = css`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding-left: 0%;
  margin-left: 0%;
`;

const singleTrackDataStyles = css`
  display: flex;
  position: relative;
  flex-direction: row;
  // border: black solid 2px;
`;

const iconTitleStyles = css`
  padding: 5%;
  margin: 5%;
  padding-left: 10%;
  font-size: 10px;
  @media (max-width: 1000px) {
    padding-left: 0%;
  }
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
  align-items: center;
  flex-direction: row;
  color: white;
  @media (max-width: 1000px) {
    margin-left: 10%;
  }
`;

export default function Release(props) {
  if (!props.allReleaseData) {
    return (
      <div>
        <Head>
          <title>Release not found</title>
          <meta
            name="description"
            content="Unfortunately, we have had trouble locating the release"
          />
        </Head>

        <h1>Release not found</h1>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{props.allReleaseData.releaseName}</title>
        <meta
          name="description"
          content={`Release Name: ${props.allReleaseData.releaseName} `}
        />
      </Head>

      <div>
        <main css={mainReleaseStyles}>
          <h1>{props.allReleaseData.releaseName}</h1>
          <br />
          <Link href="/releases">
            <img
              css={albumArtStyles}
              src={props.allReleaseData.coverArtLink}
              alt="cover art for this release"
            />
          </Link>
          <section>
            <div>
              <ul css={trackDataStyles}>
                {props.allReleaseData.trackData.map((release) => {
                  return (
                    <div css={singleTrackDataStyles} key="releaseId">
                      <ul key={`release-${release.releaseId}`}>
                        <div>
                          {release.trackNumber}. {'  '} {release.trackName}
                          {!release.colab ? '' : ' (ft.  '}
                          {release.colab}
                          {!release.colab ? '  ' : ')   '} {release.trackLength}
                        </div>
                        <br />
                      </ul>
                    </div>
                  );
                })}
              </ul>
            </div>
          </section>
          <section css={sectionStyles}>
            <br />
            <div>Label: {props.allReleaseData.recordLabel}</div>
            <br />
            <div>Released: {props.allReleaseData.releaseDate}</div>
            <br />
            <br />
            <div>Find {props.allReleaseData.releaseName} here:</div>
            <section css={iconsSectionStyles}>
              <div css={iconTitleStyles}>
                Beatport:
                <br />
                <Link href={props.allReleaseData.buyLink}>
                  <SiBeatport css={iconStyles} />
                </Link>
              </div>
              <div css={iconTitleStyles}>
                Stream:
                <Link href={props.allReleaseData.streamingLink}>
                  <BsSpotify css={iconStyles} />
                </Link>
              </div>
              <br />
              <div css={iconTitleStyles}>
                Bandcamp:
                <Link href={props.allReleaseData.bandcampLink}>
                  <SiBandcamp css={iconStyles} />
                </Link>
              </div>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const selectedRelease = await getReleaseByReleaseId(context.query.releaseId);

  const singleReleaseAllData = getReducedRelease(selectedRelease);

  return {
    props: {
      allReleaseData: singleReleaseAllData,
    },
  };
}

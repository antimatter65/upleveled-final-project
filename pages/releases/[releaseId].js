import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
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
`;

const imageStyles = css`
  margin: 0;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: -1;
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

export default function Release(props) {
  if (!props.allReleaseData.id) {
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

  const newLocal = 'props.allReleaseData.bandcampLink';
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
          <div>
            <Image
              css={imageStyles}
              src={`/${props.allReleaseData.id}.jpeg`}
              width="500"
              height="500"
              responsive
            />
          </div>
          <section>
            <div>
              <ul css={trackDataStyles}>
                {props.allReleaseData.trackData.map((release) => {
                  return (
                    <div css={singleTrackDataStyles} key="releaseId">
                      <ul key={`release-${release.releaseId}`}>
                        <div>
                          {release.trackNumber}.{'                    '}{' '}
                          {release.trackName} {release.colab}{' '}
                          {release.trackLength}
                        </div>
                        <br />
                        {/* <div>{release.trackNumber}</div>
                        <div>{release.trackName}</div>
                        <div>{release.colab}</div>
                        <div> {release.trackLength}</div>
                        <div>{release.trackNumber}</div> */}
                      </ul>
                    </div>
                  );
                })}
              </ul>
            </div>
          </section>
          <section css={sectionStyles}>
            {/* <div>{props.allReleaseData.releaseName}</div> */}
            {/* <div>Tracks: {props.allReleaseData.tracks}</div> */}
            <br />
            <div>Label: {props.allReleaseData.recordLabel}</div>
            <br />
            <div>Released: {props.allReleaseData.releaseDate}</div>
            {/* <div>Cover Art Link: {props.allReleaseData.coverArtLink}</div> */}
            <br />
            {/* <div>Beatport Link: {props.allReleaseData.buyLink}</div> */}
            <br />
            <Link href={props.allReleaseData.streamingLink}> Stream </Link>
            {/* <div>Streaming Link: {props.allReleaseData.streamingLink}</div> */}

            <Link href={props.allReleaseData.bandcampLink}> Bandcamp </Link>
            {/* <div>Bandcamp Link: {props.allReleaseData.bandcampLink}</div> */}

            <Link href={props.allReleaseData.buyLink}> Beatport</Link>
            <br />
            {/* <div>Track Name: {props.allReleaseDatatrackName}</div>
            <br />
            <div>Colab: {props.allReleaseData.col}</div>
            <br />
            <div>Track Length: {props.allReleaseData.trackLength}</div>
            <br /> */}
            <br />
          </section>
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const selectedRelease = await getReleaseByReleaseId(context.query.releaseId);
  console.log('what is here 2?', selectedRelease);

  const singleReleaseAllData = getReducedRelease(selectedRelease);

  console.log('what is here 3?', singleReleaseAllData);

  return {
    props: {
      allReleaseData: singleReleaseAllData,
    },
  };
}

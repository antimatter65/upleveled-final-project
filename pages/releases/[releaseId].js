import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { getRelease } from '../../utls/database';

const mainReleaseStyles = css`
  font-size: 13px;
  display: flex;
  position: relative;
  flex-direction: column;
  height: 49vw;
  padding-top: 50px;
  padding-left: 100px;
  justify-items: center;
`;

const imageStyles = css`
  margin: 0;
  justify-content: center;
`;

const sectionStyles = css`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 50px;
  font-size: 18px;
  background-color: white;
  height: 600px;
  border: black 1px solid;
  justify-content: center;
  width: 60%;
  font-size: 13px;
`;

export default function Release(props) {
  if (!props.release) {
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
        <title>{props.release.releaseName}</title>
        <meta
          name="description"
          content={`Release Name: ${props.release.releaseName} `}
        />
      </Head>

      <div>
        <main css={mainReleaseStyles}>
          <div>
            <Image
              css={imageStyles}
              src={`/${props.release.id}.jpeg`}
              width="300"
              height="300"
            />
          </div>
          <section css={sectionStyles}>
            <br />
            <div>Name: {props.release.releaseName}</div>
            <br />
            <div>Number of Track: {props.release.tracks}</div>
            <br />
            <div>Record Label: {props.release.recordLabel}</div>
            <br />
            <div>Release Date: {props.release.releaseDate}</div>
            <br />
            <div>Cover Art Link: {props.release.coverArtLink}</div>
            <br />
            <div>Beatport Link: {props.release.buyLink}</div>
            <br />
            <div>Streaming Link: {props.release.streamingLink}</div>
            <br />
            <div>Bandcamp Link: {props.release.bandcampLink}</div>
            <br />
            <br />
            <br />
          </section>
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const selectedRelease = await getRelease(context.query.releaseId);
  console.log('what is here?', selectedRelease);
  return {
    props: {
      release: selectedRelease,
    },
  };
}

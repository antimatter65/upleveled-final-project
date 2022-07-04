import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { getReleaseByReleaseId } from '../../utils/database';
import { getReducedRelease } from '../../utils/dataStructure';

const mainReleaseStyles = css`
  font-size: 13px;
  display: flex;
  position: relative;
  flex-direction: row;
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
          <div>
            <Image
              css={imageStyles}
              src={`/${props.allReleaseData.id}.jpeg`}
              width="300"
              height="300"
            />
          </div>
          <section css={sectionStyles}>
            <br />
            <div>Name: {props.allReleaseData.releaseName}</div>
            <br />
            <div>Number of Track: {props.allReleaseData.tracks}</div>
            <br />
            <div>Record Label: {props.allReleaseData.recordLabel}</div>
            <br />
            <div>Release Date: {props.allReleaseData.releaseDate}</div>
            <br />
            <div>Cover Art Link: {props.allReleaseData.coverArtLink}</div>
            <br />
            <div>Beatport Link: {props.allReleaseData.buyLink}</div>
            <br />
            <div>Streaming Link: {props.allReleaseData.streamingLink}</div>
            <br />
            <div>Bandcamp Link: {props.allReleaseData.bandcampLink}</div>
            <br />
            <div>Track Name: {props.allReleaseDatatrackName}</div>
            <br />
            <div>Colab: {props.allReleaseData.contributingArtists}</div>
            <br />
            <div>Track Length: {props.allReleaseData.trackLength}</div>
            <br />
            <br />
          </section>
          <section>
            <div>
              track names:
              <ul>
                {props.allReleaseData.trackData.map((release) => {
                  return (
                    <li key={`release-${release.releaseId}`}>
                      {release.trackName}
                      <br />
                      {release.trackLength}
                      <br />
                      {release.colab}
                      <br />
                      {release.trackNumber}
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* <div>
            foods:
            <ul>
              {props.animalWithFoods.foods.map((food) => {
                return <li key={`food-${food.id}`}>{food.name}</li>;
              })}
            </ul>
          </div>           */}
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

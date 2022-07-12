import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
// import Link from 'next/link';
import two from '../public/2.jpeg';
import three from '../public/3.jpeg';
import four from '../public/4.jpeg';
import theoneinthewoods21 from '../public/theoneinthewoods21.png';

// import mixtape1 from '../public/mixtape1.png';

// import { releases.Database } from '../util/database';

const titleStyles = css`
  display: flex;
  position: relative;
  color: white;
  justify-content: center;
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
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  align-items: center;
  z-index: 12;
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

const mixcloudPlayerStyles = css`
  border-radius: 5%;
`;

export default function mixesList() {
  return (
    <div>
      <Head>
        <title>Mixes</title>
        <meta name="description" content="locoad mixes from mixcloud" />
        {/* <link rel="icon" href="/faviconmixtape.png" /> */}
      </Head>
      <h1 css={titleStyles}>Mixes</h1>
      <section css={carouselContainerStyles}>
        <div class="container">
          <input type="radio" name="slider" id="item-1" checked />
          <input type="radio" name="slider" id="item-2" />
          <input type="radio" name="slider" id="item-3" />
          <input type="radio" name="slider" id="item-4" />
          <div class="cards">
            <label class="card" htmlFor="item-1" id="song-1">
              <Image src={theoneinthewoods21} css={imageCarouselStyles} />
              <iframe
                css={mixcloudPlayerStyles}
                title="mix1"
                width="100%"
                height="120"
                src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Flocoda%2Flocoda-live-the-one-in-the-woods-2021%2F"
                frameBorder="0"
                // empty sandbox to remove eslint errors
                sandbox
              />
            </label>
            <label class="card" htmlFor="item-2" id="song-2">
              <Image src={four} css={imageCarouselStyles} />
              <iframe
                title="mix2"
                width="100%"
                height="120"
                src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Flocoda%2Fliquid-mini-mix-002%2F"
                frameBorder="0"
                sandbox
              />
            </label>
            <label class="card" htmlFor="item-3" id="song-3">
              <Image src={three} css={imageCarouselStyles} />
              <br />
              <iframe
                title="mix3"
                width="100%"
                height="120"
                src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Flocoda%2Fliquid-mini-mix-001%2F"
                frameBorder="0"
                sandbox
              />
            </label>
            {/* <label class="card" for="item-4" id="song-4">
              <Image src={two} css={imageCarouselStyles} />
              <br />
              <iframe
                title="mix3"
                width="100%"
                height="120"
                src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Flocoda%2Fliquid-mix-001%2F"
                frameBorder="0"
                sandbox
              /> */}
            {/* </label> */}
          </div>
        </div>
      </section>
    </div>
  );
}

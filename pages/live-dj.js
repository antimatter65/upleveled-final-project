import { css } from '@emotion/react';
import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
// import mixtape1 from '../public/mixtape1.png';
import { getTourDates } from '../utils/database';

// import { releases.Database } from '../util/database';

const titleStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;
`;

//   color: #e499d1;

const headingStyles = css`
  display: flex;
  position: relative;
  margin-top: 8%;
  margin-left: 5%;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;
`;

const tableHeadingStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: row;
  padding-left: 3%;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const tableStyles = css`
  display: flex;
  position: relative;
  flex-direction: row;
  margin-left: 10%;
  margin-top: 5%;
  border: white 2px solid;
  background: rgba(190, 190, 190, 0.5);
  @media (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3%;
    padding: 0%;
    width: 90%;
  }
`;

const dataHeadStyles = css`
  display: flex;
  position: relative;
  border: 1px solid green;
  font-size: 15px;
  margin-left: 4%;
  margin-right: 4%;
  margin-top: 0;
  margin-bottom: 1%;
  width: auto;
  flex-direction: row;
  padding: 1%;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
const dataStyles = css`
  display: flex;
  position: relative;
  font-size: 13px;
  flex-direction: row;
  border: 1px solid green;
  margin-right: 3%;
  width: 13%;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;
  @media (max-width: 1000px) {
    flex-direction: column;
    width: 30%;
  }
`;

const buttonStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 1%;
  font-family: Lexend Zetta;
  font-size: 10px;
  padding: 10%;
  width: 200%;
  height: 30px;
  display: flex;
  flex-direction: row;
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
  // const str = '2022-09-24';
  // const date = new Date(str);

  return (
    <div>
      <Head>
        <title>Live &amp; DJ</title>
        <meta name="description" content="all tour dates" />
        {/* <link rel="icon" href="/favicon_mix_tape.png" /> */}
      </Head>
      <h1 css={titleStyles}>Live &amp; DJ</h1>
      <main>
        <h1 css={headingStyles}>Upcoming Dates:</h1>
        <section css={tableHeadingStyles}>
          <h2 css={dataHeadStyles}>Location</h2>
          <h2 css={dataHeadStyles}>Date</h2>
          <h2 css={dataHeadStyles}>Venue</h2>
          <h2 css={dataHeadStyles}>Live/DJ</h2>
          <h2 css={dataHeadStyles}>Event Link</h2>
          <h2 css={dataHeadStyles}>Tickets</h2>
          {/* <h2 css={dataHeadStyles}>Streaming Link</h2>
          <h2 css={dataHeadStyles}>Sold Out?</h2> */}
        </section>
        <hr />
        {props.tourDates
          .sort((a, b) => b.id - a.id)
          .map((tour) => {
            return (
              <div key={`release-${tour.id}`} css={tableStyles}>
                <div css={dataStyles}>{tour.location}</div>
                <div css={dataStyles}>{tour.date}</div>
                <div css={dataStyles}>{tour.eventLocation} </div>
                <div css={dataStyles}>{tour.type} </div>
                <div css={dataStyles}>
                  <button css={buttonStyles}>
                    <Link href={tour.eventLink}>Event</Link>
                  </button>
                </div>
                <div css={dataStyles}>
                  <button css={buttonStyles}>
                    <Link href={tour.ticketLink}>Tickets</Link>
                  </button>
                </div>
                {/* <div css={dataStyles}>
                  <button css={buttonStyles}>
                    <Link href={tour.streamingLink}>Stream Live Set Here</Link>
                  </button>
                </div> */}
                <div css={dataStyles}>{tour.ticketsLeft}</div>
              </div>
            );
          })}
        {/* add if statement for Sold Out or Tickets Left */}
        {/* <Link href={`/releases/${release.id}`}>
                  <Image src={`/${release.id}.jpeg`} width="600" height="400" />
                </Link> */}
        {/* </table> */}
        <h1 css={headingStyles}>Past Dates:</h1>
      </main>
    </div>
  );
}

// Code in getServerSideProps runs in
// Node.js (on the server)
//
// ONLY in the /pages directory

export async function getServerSideProps() {
  // from database.js
  const tourDates = await getTourDates();

  console.log(tourDates);

  return {
    // Anything that you pass in the props
    // object will get passed to the component
    // at the top in the `props` parameter
    props: {
      // releases.: releases.Database,
      tourDates: tourDates,
    },
  };
}

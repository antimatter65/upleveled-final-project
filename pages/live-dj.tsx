import { css } from '@emotion/react';
import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
// import mixtape1 from '../public/mixtape1.png';
import { getTourDates } from '../utils/database';

// import { releases.Database } from '../util/database';

const titleStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  color: #e499d1;
`;

const tourDatesListStyles = css`
  color: white;
  z-index: 0;
  display: flex;
  position: relative;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1%;
  margin: 8%;
  justify-content: flex-start;
  justify-content: space-evenly;
  border: 1px solid greenyellow;
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
    border: solid white 10px;
    box-shadow: #5e5df0 0 10px 20px -10px;
  }
`;

const indivdualTourDateListStyles = css`
  border: 1px solid aqua;
  display: flex;
  position: relative;
  flex-direction: row;
  padding: 2%;
  .a {
    color: green;
  }
`;

export default function releaseList(props) {
  return (
    <div>
      <Head>
        <title>Live & DJ</title>
        <meta name="description" content="all locoda tour dates" />
        {/* <link rel="icon" href="/faviconmixtape.png" /> */}
      </Head>
      <h1 css={titleStyles}>Live & DJ</h1>
      <main>
        <div css={tourDatesListStyles}>
          {props.tourdates
            .sort((a, b) => a.date - b.date)
            .map((tour) => {
              return (
                <div
                  key={`release-${tour.id}`}
                  css={indivdualTourDateListStyles}
                >
                  <div>{tour.location} |</div>
                  <br />
                  <div>{tour.date} |</div>
                  <br />
                  <div> {tour.eventLocation} |</div>
                  <br />
                  <div>{tour.type} |</div>
                  <br />
                  <div>Event Link: {tour.eventLink} |</div>
                  <br />
                  <div>Tickets: {tour.ticketLink} |</div>
                  <br />
                  <div>Streaming Link: {tour.streamingLink} |</div>
                  <br />
                  <div>Tickets Left: {tour.ticketsLeft} |</div>
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
  const tourdates = await getTourDates();

  console.log(tourdates);

  return {
    // Anything that you pass in the props
    // object will get passed to the component
    // at the top in the `props` parameter
    props: {
      // releases.: releases.Database,
      tourdates: tourdates,
    },
  };
}

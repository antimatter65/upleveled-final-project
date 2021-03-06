import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { getTourDates } from '../util/database';

const titleStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;
  @media (max-width: 1000px) {
    margin-top: 20%;
  }
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

const tableStyles = css`
  display: flex;
  position: relative;
  flex-direction: row;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
  height: 150px;
  padding: 2%;
  background: rgba(190, 190, 190, 0.5);
  border-bottom: 1px solid yellowgreen;
  :hover {
    border-bottom: 3px solid yellowgreen;
    background: rgba(190, 190, 190, 0.75);
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding: 0%;
    width: 80%;
    height: 300px;
  }
`;

const dataStyles = css`
  display: flex;
  position: relative;
  font-size: 20px;
  flex-direction: row;
  margin-right: 3%;
  width: 70%;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;
  @media (max-width: 1000px) {
    flex-direction: column;
    width: 80%;
    justify-content: center;
    align-items: center;
    margin-bottom: 2%;
    font-size: 13px;
  }
`;

const buttonPositionStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 15%;
  margin: 1%;
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
  width: 300%;
  height: 50px;
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

    @media (max-width: 1000px) {
      width: 25%;
      margin: 0%;
      padding-right: 100%;
    }
  }
`;

export default function releaseList(props) {
  // const str = '2022-09-24';
  // const date = new Date(str);

  // reduce function to create an array for new tour dates (based on id) needs to to changed to be on date

  const updatedTourDates = props.tourDates.reduce(
    (updatedTourDate, tourDate) => {
      if (tourDate.id > 11) {
        updatedTourDate.push({
          id: tourDate.id,
          location: tourDate.location,
          eventLocation: tourDate.eventLocation,
          eventLink: tourDate.eventLink,
          streamingLink: tourDate.streamingLink,
          date: tourDate.date,
          ticketLink: tourDate.ticketLink,
          ticketsLeft: tourDate.ticketsLeft,
          type: tourDate.type,
        });
      }
      return updatedTourDate;
    },
    [],
  );

  // reduce function to create an array for old tour dates
  const oldTourDates = props.tourDates.reduce((oldTourDate, tourDate) => {
    if (tourDate.id < 12) {
      oldTourDate.push({
        id: tourDate.id,
        location: tourDate.location,
        eventLocation: tourDate.eventLocation,
        eventLink: tourDate.eventLink,
        streamingLink: tourDate.streamingLink,
        date: tourDate.date,
        ticketLink: tourDate.ticketLink,
        ticketsLeft: tourDate.ticketsLeft,
        type: tourDate.type,
      });
    }
    return oldTourDate;
  }, []);

  return (
    <div>
      <Head>
        <title>LOCODA | Live &amp; DJ</title>
        <meta
          name="description"
          content="Up and coming tour dates- live and Dj for Locoda Drum and Bass Artist/Dj/Producer from the Manchester UK"
        />
        <meta
          name="keywords"
          content="Locoda, Drum and Bass, DnB, Drum and Bass, Manchester, DJ, Producer, Code Recordings"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 css={titleStyles}>Live &amp; DJ</h1>
      <main>
        <h1 css={headingStyles}>Upcoming Dates:</h1>

        {updatedTourDates
          .sort((a, b) => a.id - b.id)
          .map((tour) => {
            return (
              <div key={`release-${tour.id}`} css={tableStyles}>
                <div css={dataStyles}>{tour.location}</div>
                <div css={dataStyles}>{tour.date}</div>
                <div css={dataStyles}>{tour.eventLocation} </div>
                <div css={dataStyles}>{tour.type} </div>
                <div css={buttonPositionStyles}>
                  <button css={buttonStyles}>
                    <Link href={tour.eventLink}>Event</Link>
                  </button>
                </div>
                <div css={buttonPositionStyles}>
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
        {oldTourDates
          .sort((a, b) => b.id - a.id)
          .map((tour) => {
            return (
              <div key={`release-${tour.id}`} css={tableStyles}>
                <div css={dataStyles}>{tour.location}</div>
                <div css={dataStyles}>{tour.date}</div>
                <div css={dataStyles}>{tour.eventLocation} </div>
                <div css={dataStyles}>{tour.type} </div>
                {/* <div css={buttonPositionStyles}>
                  <button css={buttonStyles}>
                    <Link href={tour.eventLink}>Event</Link>
                  </button>
                </div>
                <div css={buttonPositionStyles}>
                  <button css={buttonStyles}>
                    <Link href={tour.ticketLink}>Tickets</Link>
                  </button>
                </div> */}
                <div css={dataStyles}>
                  <button css={buttonStyles}>
                    <Link href={tour.streamingLink}>See What You Missed!</Link>
                  </button>
                </div>
                <div css={dataStyles}>{tour.ticketsLeft}</div>
              </div>
            );
          })}
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

  // console.log(tourDates);

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

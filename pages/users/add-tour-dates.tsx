import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getUserByValidSessionToken, TourDate } from '../../utils/database';

const mainHeaderStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  font-size: 13px;
  color: white;
`;
const mainInputArea = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 10px;
  color: white;
  border: 2px green solid;
`;

const inputStyles = css`
  font-family: Lexend Zetta;
  font-size: 10px;
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const mainStyles = css``;

export default function ApiFrontEndTourDates() {
  const [tourDatesList, setTourDatesList] = useState<TourDate[]>([]);

  const [editActiveOnEventNumber, setEditActiveOnEventNumber] = useState<
    number | undefined
  >(undefined);

  // state for new event inputs

  const [newLocation, setNewLocation] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventVenue, setNewEventVenue] = useState('');
  const [newLiveType, setNewLiveType] = useState('');
  const [newEventLink, setNewEventLink] = useState('');
  const [newTicketLink, setNewTicketLink] = useState('');
  const [newStreamingLink, setNewStreamingLink] = useState('');
  const [newSoldOutCheck, setNewSoldOutCheck] = useState('');

  // edit state for the edit event inputs

  const [editLocation, setEditLocation] = useState('');
  const [editEventDate, setEditEventDate] = useState('');
  const [editEventVenue, setEditEventVenue] = useState('');
  const [editLiveType, setEditLiveType] = useState('');
  const [editEventLink, setEditEventLink] = useState('');
  const [editTicketLink, setEditTicketLink] = useState('');
  const [editStreamingLink, setEditStreamingLink] = useState('');
  const [editSoldOutCheck, setEditSoldOutCheck] = useState('');

  // useEffect to GET the full current list of events from database tourdates on first load of the page

  useEffect(() => {
    async function getTourDates() {
      const response = await fetch('/api/tourdates');
      const events = await response.json();
      setTourDatesList(events);
    }
    getTourDates().catch(() => {
      console.log('request to get events from database failed');
    });
  }, []);

  // for onclick function to add new event to database

  async function newTourDateHandler() {
    const response = await fetch('/api/tourdates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: newLocation,
        date: newEventDate,
        eventLocation: newEventVenue,
        type: newLiveType,
        eventLink: newEventLink,
        ticketLink: newTicketLink,
        streamingLink: newStreamingLink,
        ticketsLeft: newSoldOutCheck,
      }),
    });
    const createdNewEvent = await response.json();

    // copy and update copy of the state

    const newState = [...tourDatesList, createdNewEvent];

    // update setState Function
    setTourDatesList(newState);
    setNewLocation('');
    setNewEventDate('');
    setEditLiveType('');
    setNewEventVenue('');
    setNewTicketLink('');
    setNewSoldOutCheck('');
    setNewStreamingLink('');
    setNewEventLink('');
  }

  // onclick function to delete a tour date / event from database
  async function deleteTourDateHandler(id: number) {
    const response = await fetch(`/api/tourdates/${id}`, {
      method: 'DELETE',
    });
    const deletedEvent = await response.json();

    // copy and update copy of the state

    const newState = tourDatesList.filter(
      (event) => event.id !== deletedEvent.id,
    );

    // update setState Function
    setTourDatesList(newState);
  }

  // onclick function to update a event in the events database
  async function updateEventHandler(id: number) {
    const response = await fetch(`/api/tourdates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: editLocation,
        date: editEventDate,
        eventLocation: editEventVenue,
        type: editLiveType,
        eventLink: editEventLink,
        ticketLink: editTicketLink,
        streamingLink: editStreamingLink,
        ticketsLeft: editSoldOutCheck,
      }),
    });
    const updatedEvent = await response.json();

    // copy and update copy of the state

    const newState = tourDatesList.map((event) => {
      if (event.id === updatedEvent.id) {
        return updatedEvent;
      } else {
        return event;
      }
    });

    // update setState Function
    setTourDatesList(newState);
    console.log('compare tourdates newstate', newState);
  }

  return (
    <div>
      <Head>
        <title>Edit Live Dates</title>
        <meta
          name="update events"
          content="API front end for editing tourdates database"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainStyles}>
        <br />
        <br />
        <br />
        <br />
        <section css={mainHeaderStyles}>
          <h1>Add New Event:</h1>
        </section>
        <hr />
        <section css={mainInputArea}>
          <label>
            Event Location:
            <input
              css={inputStyles}
              value={newLocation}
              onChange={(event) => setNewLocation(event.currentTarget.value)}
            />
          </label>
          <label>
            Event Date:
            <input
              css={inputStyles}
              value={newEventDate}
              onChange={(event) => setNewEventDate(event.currentTarget.value)}
            />
          </label>
          <label>
            Event Venue:
            <input
              css={inputStyles}
              value={newEventVenue}
              onChange={(event) => setNewEventVenue(event.currentTarget.value)}
            />
          </label>
          <label>
            Performance Type (Live / DJ / Etc):
            <input
              css={inputStyles}
              value={newLiveType}
              onChange={(event) => setNewLiveType(event.currentTarget.value)}
            />
          </label>
          <br />
          <label>
            Link to Event (Website / Event Page / RA / Facebook / Etc) :
            <input
              css={inputStyles}
              value={newEventLink}
              onChange={(event) => setNewEventLink(event.currentTarget.value)}
            />
          </label>
          <label>
            Tickets Link:
            <input
              css={inputStyles}
              value={newTicketLink}
              onChange={(event) => setNewTicketLink(event.currentTarget.value)}
            />
          </label>
          <label>
            StreamingLink:
            <input
              css={inputStyles}
              value={newStreamingLink}
              onChange={(event) =>
                setNewStreamingLink(event.currentTarget.value)
              }
            />
          </label>
          <label>
            Event Sold Out (Yes/No):
            <input
              css={inputStyles}
              value={newSoldOutCheck}
              onChange={(event) =>
                setNewSoldOutCheck(event.currentTarget.value)
              }
            />
          </label>
          <button
            onClick={() => {
              newTourDateHandler().catch(() => {
                console.log('request to add new tour date to database failed');
              });
            }}
          >
            Add New Event
          </button>
          <br />
          <br />
          <hr />
          <h2>Edit Events In Database:</h2>
          <hr />
        </section>
        <br />
        {tourDatesList
          .sort((a, b) => a.id - b.id)
          .map((eventdate) => {
            // if the event.id is equal to the active edit editActiveOnEventNumber then the input values are enabled otherwise they are disabled
            return eventdate.id === editActiveOnEventNumber ? (
              <section css={mainInputArea} key={eventdate.id}>
                <div>Event Id: {eventdate.id}</div>
                <label>
                  Location:
                  <input
                    css={inputStyles}
                    value={editLocation}
                    onChange={(event) =>
                      setEditLocation(event.currentTarget.value)
                    }
                  />
                </label>
                <label>
                  Event Date:
                  <input
                    css={inputStyles}
                    value={editEventDate}
                    onChange={(event) =>
                      setEditEventDate(event.currentTarget.value)
                    }
                  />
                </label>
                <label>
                  Event Venue:
                  <input
                    css={inputStyles}
                    value={editEventVenue}
                    onChange={(event) =>
                      setEditEventVenue(event.currentTarget.value)
                    }
                  />
                </label>
                <br />
                <label>
                  Performance Type (Live / DJ / Etc):
                  <input
                    css={inputStyles}
                    value={editLiveType}
                    onChange={(event) =>
                      setEditLiveType(event.currentTarget.value)
                    }
                  />
                </label>

                <label>
                  Link to Event (Website / Event Page / RA / Facebook / Etc) :
                  <input
                    css={inputStyles}
                    value={editEventLink}
                    onChange={(event) =>
                      setEditEventLink(event.currentTarget.value)
                    }
                  />
                </label>
                <label>
                  Tickets Link:
                  <input
                    css={inputStyles}
                    value={editTicketLink}
                    onChange={(event) =>
                      setEditTicketLink(event.currentTarget.value)
                    }
                  />
                </label>
                <br />
                <label>
                  Streaming Link:
                  <input
                    css={inputStyles}
                    value={editStreamingLink}
                    onChange={(event) =>
                      setEditStreamingLink(event.currentTarget.value)
                    }
                  />
                </label>
                <label>
                  Event Sold Out (Yes/No):
                  <input
                    css={inputStyles}
                    value={editSoldOutCheck}
                    onChange={(event) =>
                      setEditSoldOutCheck(event.currentTarget.value)
                    }
                  />
                </label>
                <button
                  onClick={() => {
                    setEditActiveOnEventNumber(undefined);
                    updateEventHandler(eventdate.id).catch(() => {
                      console.log(
                        'request to update events in database failed',
                      );
                    });
                  }}
                >
                  Save Changes
                </button>
                <br />
                <button
                  onClick={() => {
                    deleteTourDateHandler(eventdate.id).catch(() => {
                      console.log(
                        'request to delete event from database failed',
                      );
                    });
                  }}
                >
                  Delete Event
                </button>
                <br />
                <hr />
              </section>
            ) : (
              <section css={mainInputArea} key={eventdate.id}>
                <div>Event Id: {eventdate.id}</div>
                <label>
                  Event Location:
                  <input
                    css={inputStyles}
                    value={eventdate.location}
                    disabled
                  />
                </label>
                <label>
                  Event Date:
                  <input css={inputStyles} value={eventdate.date} disabled />
                </label>
                <label>
                  Event Venue:
                  <input
                    css={inputStyles}
                    value={eventdate.eventLocation}
                    disabled
                  />
                </label>
                <label>
                  Performance Type (Live / DJ / Etc):
                  <input css={inputStyles} value={eventdate.type} disabled />
                </label>
                <br />
                <label>
                  Link to Event (Website / Event Page / RA / Facebook / Etc) :
                  <input
                    css={inputStyles}
                    value={eventdate.eventLink}
                    disabled
                  />
                </label>
                <label>
                  Tickets Link:
                  <input
                    css={inputStyles}
                    value={eventdate.ticketLink}
                    disabled
                  />
                </label>
                <br />
                <label>
                  Streaming Link:
                  <input
                    css={inputStyles}
                    value={eventdate.streamingLink}
                    disabled
                  />
                </label>
                <label>
                  Event Sold Out (Yes/No):
                  <input
                    css={inputStyles}
                    value={eventdate.ticketsLeft}
                    disabled
                  />
                </label>
                <button
                  onClick={() => {
                    setEditActiveOnEventNumber(eventdate.id);
                    setEditLocation(eventdate.location);
                    setEditEventDate(eventdate.date);
                    setEditEventVenue(eventdate.eventLocation);
                    setEditLiveType(eventdate.type);
                    setEditEventLink(eventdate.eventLink);
                    setEditStreamingLink(eventdate.streamingLink);
                    setEditTicketLink(eventdate.ticketLink);
                    // this is a boolean and may cause problems and therefore may need amending
                    setEditSoldOutCheck(eventdate.ticketsLeft);
                  }}
                >
                  Edit
                </button>
                <br />
                <hr />
              </section>
            );
          })}
      </main>
    </div>
  );
}
// to ensure that the user has to be logged in to be able to view this page

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // for getUserByUsername parseInt is not

  // get just the sessionToken (without this all the cookie are returned) and set to equal to const user
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );

  if (user) {
    return {
      props: {
        user: user,
      },
    };
  }
  // redirect to login page if not logged then return to the profile page after successful log in
  return {
    redirect: {
      destination: '/login?returnTo=/users/private-page',
      permanent: false,
    },
  };
}

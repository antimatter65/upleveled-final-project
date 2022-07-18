import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getUserByValidSessionToken, Release } from '../../utils/database';

const mainHeaderStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  font-size: 26px;
  color: white;
  padding-top: 2%;
  text-shadow: 1px 1px 1px #3c5c5e;
`;

const subHeaderStyles = css`
  display: flex;
  position: relative;
  font-size: 26px;
  margin-left: 5%;
  color: white;
  padding-top: 5%;
  width: 80%;
  border-bottom: solid 1px white;
`;

const mainInputArea = css`
  display: flex;
  position: relative;
  padding-left: 20%;
  flex-direction: column;
  font-size: 10px;
  color: white;
  padding: 5%;
  border-bottom: white 1px solid;
  text-shadow: 1px 1px 1px #3c5c5e;
`;

const singleInputArea = css`
  display: flex;
  position: relative;
  flex-direction: column;
  font-size: 13px;
  color: white;
  height: 1%;
  margin-top: 1%;
  text-shadow: 1px 1px 1px #3c5c5e;
`;

const inputStyles = css`
  font-family: Lexend Zetta;
  font-size: 13px;
  width: 40%;
  height: auto;
  display: flex;
  right: 0%;
  border-radius: 10px;
  margin-left: 50%;
`;

const inputStylesDate = css`
  font-family: Lexend Zetta;
  font-size: 13px;
  width: 15%;
  height: auto;
  display: flex;
  right: 0%;
  border-radius: 10px;
  margin-left: 50%;
`;

const inputStylesCheckbox = css`
  font-family: Lexend Zetta;
  font-size: 13px;
  width: 15%;
  height: auto;
  display: flex;
  right: 0%;
  border-radius: 10px;
`;

const buttonStyles = css`
  margin: 1%;
  padding: 1%;
  font-family: Lexend Zetta;
  font-size: 10px;
  width: 10%;
  display: flex;
  flex-direction: column;
  background-color: greenyellow;
  color: black;
  opacity: 0.5;
  border-radius: 15px;
  margin-left: 50%;
  box-shadow: gold;
  :hover {
    color: greenyellow;
    background-color: black;
  }
`;

const mainStyles = css`
  color: white;
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
`;

export default function ApiFrontEndReleases() {
  const [releaseList, setReleaseList] = useState<Release[]>([]);

  const [currentReleaseEdit, setCurrentReleaseEdit] = useState<
    number | undefined
  >(undefined);

  // state for new release inputs

  const [newReleaseName, setNewReleaseName] = useState('');
  const [newNumberOfTracks, setNewNumberOfTracks] = useState('');
  const [newReleaseDate, setNewReleaseDate] = useState('');
  const [newRecordLabel, setNewRecordLabel] = useState('');
  const [newCoverArtLink, setNewCoverArtLink] = useState('');
  const [newBuyLink, setNewBuyLink] = useState('');
  const [newStreamingLink, setNewStreamingLink] = useState('');
  const [newBandcampLink, setNewBandcampLink] = useState('');

  // edit state for the edit release inputs

  const [editReleaseName, setEditReleaseName] = useState('');
  const [editNumberOfTracks, setEditNumberOfTracks] = useState('');
  const [editReleaseDate, setEditReleaseDate] = useState('');
  const [editRecordLabel, setEditRecordLabel] = useState('');
  const [editCoverArtLink, setEditCoverArtLink] = useState('');
  const [editBuyLink, setEditBuyLink] = useState('');
  const [editStreamingLink, setEditStreamingLink] = useState('');
  const [editBandcampLink, setEditBandcampLink] = useState('');

  // useEffect to GET the database from releases on first load of the page

  useEffect(() => {
    async function getReleases() {
      const response = await fetch('/api/releases');
      const releases = await response.json();
      setReleaseList(releases);
    }
    getReleases().catch(() => {
      console.log('request to get releases from database failed');
    });
  }, []);

  // for onclick function to add new release to database

  async function newReleaseHandeler() {
    const response = await fetch('/api/releases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        releaseName: newReleaseName,
        tracks: newNumberOfTracks,
        releaseDate: newReleaseDate,
        recordLabel: newRecordLabel,
        coverArtLink: newCoverArtLink,
        buyLink: newBuyLink,
        streamingLink: newStreamingLink,
        bandcampLink: newBandcampLink,
      }),
    });
    const createdNewRelease = await response.json();

    // copy and update copy of the state

    const newState = [...releaseList, createdNewRelease];

    // update setState Function
    setReleaseList(newState);
    setNewReleaseName('');
    setNewNumberOfTracks('');
    setNewReleaseDate('');
    setNewRecordLabel('');
    setNewCoverArtLink('');
    setNewBuyLink('');
    setNewStreamingLink('');
    setNewBandcampLink('');
  }

  // onclick function to delete a release from database
  async function deleteReleaseHandeler(id: number) {
    const response = await fetch(`/api/releases/${id}`, {
      method: 'DELETE',
    });
    const deletedRelease = await response.json();

    // copy and update copy of the state

    const newState = releaseList.filter(
      (release) => release.id !== deletedRelease.id,
    );

    // update setState Function
    setReleaseList(newState);
  }

  // onclick function to update a release in the releases database
  async function updateReleaseHandler(id: number) {
    const response = await fetch(`/api/releases/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        releaseName: editReleaseName,
        tracks: editNumberOfTracks,
        releaseDate: editReleaseDate,
        recordLabel: editRecordLabel,
        coverArtLink: editCoverArtLink,
        buyLink: editBuyLink,
        streamingLink: editStreamingLink,
        bandcampLink: editBandcampLink,
      }),
    });

    const updatedRelease = await response.json();

    // copy and update copy of the state

    const newState = releaseList.map((release) => {
      if (release.id === updatedRelease.id) {
        return updatedRelease;
      } else {
        return release;
      }
    });

    // update setState Function
    setReleaseList(newState);
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainStyles}>
        <section css={mainHeaderStyles}>
          <h1>Add Release:</h1>
        </section>
        <hr />
        <section css={mainInputArea}>
          <label css={singleInputArea}>
            Release Name:
            <input
              css={inputStyles}
              value={newReleaseName}
              onChange={(event) => setNewReleaseName(event.currentTarget.value)}
            />
          </label>
          <label css={singleInputArea}>
            Release Date
            <input
              css={inputStyles}
              value={newReleaseDate}
              onChange={(event) => setNewReleaseDate(event.currentTarget.value)}
            />
          </label>
          <label css={singleInputArea}>
            Record Label:
            <input
              css={inputStyles}
              value={newRecordLabel}
              onChange={(event) => setNewRecordLabel(event.currentTarget.value)}
            />
          </label>
          <label css={singleInputArea}>
            Tracks:
            <input
              css={inputStyles}
              value={newNumberOfTracks}
              onChange={(event) =>
                setNewNumberOfTracks(event.currentTarget.value)
              }
            />
          </label>
          <br />
          <label css={singleInputArea}>
            CoverArtLink:
            <input
              css={inputStyles}
              value={newCoverArtLink}
              onChange={(event) =>
                setNewCoverArtLink(event.currentTarget.value)
              }
            />
          </label>
          <label css={singleInputArea}>
            Buy Link:
            <input
              css={inputStyles}
              value={newBuyLink}
              onChange={(event) => setNewBuyLink(event.currentTarget.value)}
            />
          </label>
          <label css={singleInputArea}>
            StreamingLink:
            <input
              css={inputStyles}
              value={newStreamingLink}
              onChange={(event) =>
                setNewStreamingLink(event.currentTarget.value)
              }
            />
          </label>
          <label css={singleInputArea}>
            Bandcamp Link:
            <input
              css={inputStyles}
              value={newBandcampLink}
              onChange={(event) =>
                setNewBandcampLink(event.currentTarget.value)
              }
            />
          </label>
          <button
            css={buttonStyles}
            onClick={() => {
              newReleaseHandeler().catch(() => {
                console.log('request to add new releases to database failed');
              });
            }}
          >
            Add New Release
          </button>
          <br />
        </section>
        <hr />
        <h2>Edit Releases In Database:</h2>
        <hr />
        <br />
        {releaseList
          .sort((a, b) => a.id - b.id)
          .map((release) => {
            // if the release.id is equal to the active edit currentReleaseEdit then the input values are enabled otherwise they are disabled
            return release.id === currentReleaseEdit ? (
              <section css={mainInputArea} key={release.id}>
                <div>Release Id: {release.id}</div>
                <label css={singleInputArea}>
                  Release Name:
                  <input
                    css={inputStyles}
                    value={editReleaseName}
                    onChange={(event) =>
                      setEditReleaseName(event.currentTarget.value)
                    }
                  />
                </label>
                <label css={singleInputArea}>
                  Release Date:
                  <input
                    css={inputStyles}
                    value={editReleaseDate}
                    onChange={(event) =>
                      setEditReleaseDate(event.currentTarget.value)
                    }
                  />
                </label>
                <label css={singleInputArea}>
                  Record Label:
                  <input
                    css={inputStyles}
                    value={editRecordLabel}
                    onChange={(event) =>
                      setEditRecordLabel(event.currentTarget.value)
                    }
                  />
                </label>
                <br />
                <label css={singleInputArea}>
                  Tracks:
                  <input
                    css={inputStyles}
                    value={editNumberOfTracks}
                    onChange={(event) =>
                      setEditNumberOfTracks(event.currentTarget.value)
                    }
                  />
                </label>

                <label css={singleInputArea}>
                  CoverArtLink:
                  <input
                    css={inputStyles}
                    value={editCoverArtLink}
                    onChange={(event) =>
                      setEditCoverArtLink(event.currentTarget.value)
                    }
                  />
                </label>
                <label css={singleInputArea}>
                  Buy Link:
                  <input
                    css={inputStyles}
                    value={editBuyLink}
                    onChange={(event) =>
                      setEditBuyLink(event.currentTarget.value)
                    }
                  />
                </label>
                <br />
                <label css={singleInputArea}>
                  StreamingLink:
                  <input
                    css={inputStyles}
                    value={editStreamingLink}
                    onChange={(event) =>
                      setEditStreamingLink(event.currentTarget.value)
                    }
                  />
                </label>
                <label css={singleInputArea}>
                  Bandcamp Link:
                  <input
                    css={inputStyles}
                    value={editBandcampLink}
                    onChange={(event) =>
                      setEditBandcampLink(event.currentTarget.value)
                    }
                  />
                </label>
                <button
                  css={buttonStyles}
                  onClick={() => {
                    setCurrentReleaseEdit(undefined);
                    updateReleaseHandler(release.id).catch(() => {
                      console.log(
                        'request to update releases in database failed',
                      );
                    });
                  }}
                >
                  Save Changes
                </button>
                <br />
                <button
                  css={buttonStyles}
                  onClick={() => {
                    deleteReleaseHandeler(release.id).catch(() => {
                      console.log(
                        'request to delete release from database failed',
                      );
                    });
                  }}
                >
                  Delete Release
                </button>
                <br />
                <hr />
              </section>
            ) : (
              <section css={mainInputArea} key={release.id}>
                <div>Release Id: {release.id}</div>
                <label css={singleInputArea}>
                  Release Name:
                  <input
                    css={inputStyles}
                    value={release.releaseName}
                    disabled
                  />
                </label>
                <label css={singleInputArea}>
                  Release Date:
                  <input
                    css={inputStyles}
                    value={release.releaseDate}
                    disabled
                  />
                </label>
                <label css={singleInputArea}>
                  Record Label:
                  <input
                    css={inputStyles}
                    value={release.recordLabel}
                    disabled
                  />
                </label>
                <br />
                <label css={singleInputArea}>
                  Tracks:
                  <input css={inputStyles} value={release.tracks} disabled />
                </label>
                <label>
                  CoverArtLink:
                  <input
                    css={inputStyles}
                    value={release.coverArtLink}
                    disabled
                  />
                </label>
                <label css={singleInputArea}>
                  Buy Link:
                  <input css={inputStyles} value={release.buyLink} disabled />
                </label>
                <br />
                <label css={singleInputArea}>
                  StreamingLink:
                  <input
                    css={inputStyles}
                    value={release.streamingLink}
                    disabled
                  />
                </label>
                <label css={singleInputArea}>
                  Bandcamp Link:
                  <input
                    css={inputStyles}
                    value={release.bandcampLink}
                    disabled
                  />
                </label>
                <button
                  css={buttonStyles}
                  onClick={() => {
                    setCurrentReleaseEdit(release.id);
                    setEditReleaseName(release.releaseName);
                    setEditReleaseDate(release.releaseDate);
                    setEditRecordLabel(release.recordLabel);
                    // may cause issus with database???
                    setEditNumberOfTracks(release.tracks.toString());
                    setEditBuyLink(release.buyLink);
                    setEditStreamingLink(release.streamingLink);
                    setEditBandcampLink(release.bandcampLink);
                    setEditCoverArtLink(release.coverArtLink);
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

import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getUserByValidSessionToken, Release } from '../../utils/database';

const mainHeaderStyles = css`
  margin: 2%;
  font-size: 13px;
`;
const mainInputArea = css`
  margin: 1%;
  font-size: 10px;
`;

const inputStyles = css`
  margin: 1%;
  font-family: Lexend Zetta;
  font-size: 10px;
  width: 30%;
  display: flex;
  flex-direction: column;
`;

export default function ApiFrontEndReleases() {
  // const [releaseList, setReleaseList] = useState([
  //   {
  //     id: 1,
  //     releaseName: 'Closer',
  //     tracks: 2,
  //     releaseDate: '2022/04/21',
  //     recordLabel: 'Code Recordings',
  //     coverArtLink: 'somelink',
  //     buyLink: 'somelink',
  //     streamingLink: 'somelink',
  //     bandcampLink: 'somelink',
  //   },
  //   {
  //     id: 2,
  //     releaseName: 'White-Label-1',
  //     tracks: 3,
  //     releaseDate: '2022/07/05',
  //     recordLabel: 'DOM Recordings',
  //     coverArtLink: 'somelink',
  //     buyLink: 'somelink',
  //     streamingLink: 'somelink',
  //     bandcampLink: 'somelink',
  //   },
  // ]);

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
    const updateRelease = await response.json();

    // copy and update copy of the state

    const newState = releaseList.map((release) => {
      if (release.id === updateRelease.id) {
        return updateRelease;
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

      <main>
        <section css={mainHeaderStyles}>
          <h1>Add Release:</h1>
        </section>
        <hr />
        <section css={mainInputArea}>
          <label>
            Release Name:
            <input
              css={inputStyles}
              value={newReleaseName}
              onChange={(event) => setNewReleaseName(event.currentTarget.value)}
            />
          </label>
          <label>
            Release Date
            <input
              css={inputStyles}
              value={newReleaseDate}
              onChange={(event) => setNewReleaseDate(event.currentTarget.value)}
            />
          </label>
          <label>
            Record Label:
            <input
              css={inputStyles}
              value={newRecordLabel}
              onChange={(event) => setNewRecordLabel(event.currentTarget.value)}
            />
          </label>
          <label>
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
          <label>
            CoverArtLink:
            <input
              css={inputStyles}
              value={newCoverArtLink}
              onChange={(event) =>
                setNewCoverArtLink(event.currentTarget.value)
              }
            />
          </label>
          <label>
            Buy Link:
            <input
              css={inputStyles}
              value={newBuyLink}
              onChange={(event) => setNewBuyLink(event.currentTarget.value)}
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
            onClick={() => {
              newReleaseHandeler().catch(() => {
                console.log('request to add new releases to database failed');
              });
            }}
          >
            Add New Release
          </button>
          <br />
          <br />
          <hr />
          <h2>Edit Releases In Database:</h2>
          <hr />
        </section>
        <br />
        {releaseList
          .sort((a, b) => a.id - b.id)
          .map((release) => {
            // if the release.id is equal to the active edit currentReleaseEdit then the input values are enabled otherwise they are disabled
            return release.id === currentReleaseEdit ? (
              <section css={mainInputArea} key={release.id}>
                <div>Release Id: {release.id}</div>
                <label>
                  Release Name:
                  <input
                    css={inputStyles}
                    value={editReleaseName}
                    onChange={(event) =>
                      setEditReleaseName(event.currentTarget.value)
                    }
                  />
                </label>
                <label>
                  Release Date:
                  <input
                    css={inputStyles}
                    value={editReleaseDate}
                    onChange={(event) =>
                      setEditReleaseDate(event.currentTarget.value)
                    }
                  />
                </label>
                <label>
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
                <label>
                  Tracks:
                  <input
                    css={inputStyles}
                    value={editNumberOfTracks}
                    onChange={(event) =>
                      setEditNumberOfTracks(event.currentTarget.value)
                    }
                  />
                </label>

                <label>
                  CoverArtLink:
                  <input
                    css={inputStyles}
                    value={editCoverArtLink}
                    onChange={(event) =>
                      setEditCoverArtLink(event.currentTarget.value)
                    }
                  />
                </label>
                <label>
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
                <label>
                  StreamingLink:
                  <input
                    css={inputStyles}
                    value={editStreamingLink}
                    onChange={(event) =>
                      setEditStreamingLink(event.currentTarget.value)
                    }
                  />
                </label>
                <label>
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
                <label>
                  Release Name:
                  <input
                    css={inputStyles}
                    value={release.releaseName}
                    disabled
                  />
                </label>
                <label>
                  Release Date:
                  <input
                    css={inputStyles}
                    value={release.releaseDate}
                    disabled
                  />
                </label>
                <label>
                  Record Label:
                  <input
                    css={inputStyles}
                    value={release.recordLabel}
                    disabled
                  />
                </label>
                <br />
                <label>
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
                <label>
                  Buy Link:
                  <input css={inputStyles} value={release.buyLink} disabled />
                </label>
                <br />
                <label>
                  StreamingLink:
                  <input
                    css={inputStyles}
                    value={release.streamingLink}
                    disabled
                  />
                </label>
                <label>
                  Bandcamp Link:
                  <input
                    css={inputStyles}
                    value={release.bandcampLink}
                    disabled
                  />
                </label>
                <button
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

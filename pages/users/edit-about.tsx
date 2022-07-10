import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { AboutData, getUserByValidSessionToken } from '../../utils/database';

const mainInputArea = css`
  margin: 1%;
  font-size: 10px;
`;

const inputStyles = css`
  margin: 1%;
  font-family: Lexend Zetta;
  font-size: 10px;
  width: 80%;
  height: 20%;
  display: flex;
  flex-direction: column;
`;

export default function ApiFrontEndAbout() {
  const [aboutList, setAboutList] = useState<AboutData[]>([]);

  const [activeEdit, setActiveEdit] = useState<number | undefined>(undefined);

  // edit state for the edit aboutList inputs

  const [editParagraphOne, setEditParagraphOne] = useState('');
  const [editParagraphTwo, setEditParagraphTwo] = useState('');
  const [editParagraphThree, setEditParagraphThree] = useState('');
  const [editParagraphFour, setEditParagraphFour] = useState('');
  //
  const [editExternalLinkOne, setEditExternalLinkOne] = useState('');
  const [editExternalLinkTwo, setEditExternalLinkTwo] = useState('');
  const [editExternalLinkThree, setEditExternalLinkThree] = useState('');

  // useEffect to GET the database from about on first load of the page

  useEffect(() => {
    async function getAbout() {
      const response = await fetch(`/api/about/`);
      const about = await response.json();
      setAboutList(about);
    }
    getAbout().catch(() => {
      console.log('request to get about info from database failed');
    });
  }, []);

  // onclick function to update a aboutList in the releases database
  async function updateAboutHandler(id: number) {
    const response = await fetch(`/api/about/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paragraph1: editParagraphOne,
        paragraph2: editParagraphTwo,
        paragraph3: editParagraphThree,
        paragraph4: editParagraphFour,
        externalLink1: editExternalLinkOne,
        externalLink2: editExternalLinkTwo,
        externalLink3: editExternalLinkThree,
      }),
    });

    const updateAbout = await response.json();

    // copy and update copy of the state

    const newState = aboutList.map((about) => {
      if (about.id === updateAbout.id) {
        return updateAbout;
      } else {
        return about;
      }
    });

    // update setState Function
    setAboutList(newState);
    console.log('compare about newstate', newState);
  }

  return (
    <div>
      <Head>
        <title>Edit About Page</title>
        <meta
          name="edit about"
          content="API front end for editing about database"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2>Edit About Page:</h2>
        <br />
        {aboutList.map((aboutinput) => {
          // if the aboutList.id is equal to the active edit activeEdit then the input values are enabled otherwise they are disabled
          return aboutinput.id === activeEdit ? (
            <section css={mainInputArea} key={aboutinput.id}>
              <label>
                Paragraph 1:
                <textarea
                  css={inputStyles}
                  value={editParagraphOne}
                  onChange={(event) =>
                    setEditParagraphOne(event.currentTarget.value)
                  }
                />
              </label>
              <label>
                Paragraph 2:
                <textarea
                  css={inputStyles}
                  value={editParagraphTwo}
                  onChange={(event) =>
                    setEditParagraphTwo(event.currentTarget.value)
                  }
                />
              </label>
              <label>
                Paragraph 3:
                <textarea
                  css={inputStyles}
                  value={editParagraphThree}
                  onChange={(event) =>
                    setEditParagraphThree(event.currentTarget.value)
                  }
                />
              </label>
              <br />
              <label>
                Paragraph 4:
                <textarea
                  css={inputStyles}
                  value={editParagraphFour}
                  onChange={(event) =>
                    setEditParagraphFour(event.currentTarget.value)
                  }
                />
              </label>
              <label>
                External Link 1:
                <textarea
                  css={inputStyles}
                  value={editExternalLinkOne}
                  onChange={(event) =>
                    setEditExternalLinkOne(event.currentTarget.value)
                  }
                />
              </label>
              <label>
                External Link 2:
                <textarea
                  css={inputStyles}
                  value={editExternalLinkTwo}
                  onChange={(event) =>
                    setEditExternalLinkTwo(event.currentTarget.value)
                  }
                />
              </label>
              <br />
              <label>
                External Link 3:
                <textarea
                  css={inputStyles}
                  value={editExternalLinkThree}
                  onChange={(event) =>
                    setEditExternalLinkThree(event.currentTarget.value)
                  }
                />
              </label>
              <button
                onClick={() => {
                  setActiveEdit(undefined);
                  updateAboutHandler(aboutinput.id).catch(() => {
                    console.log(
                      'request to update about info in database failed',
                    );
                  });
                }}
              >
                Save Changes
              </button>
              <br />
              <br />
              <hr />
            </section>
          ) : (
            <section css={mainInputArea} key={aboutinput.id}>
              <label>
                Paragraph 1:
                <input
                  css={inputStyles}
                  value={aboutinput.paragraph1}
                  disabled
                />
              </label>
              <label>
                Paragarph 2:
                <input
                  css={inputStyles}
                  value={aboutinput.paragraph2}
                  disabled
                />
              </label>
              <label>
                Paragarph 3:
                <input
                  css={inputStyles}
                  value={aboutinput.paragraph3}
                  disabled
                />
              </label>
              <br />
              <label>
                Paragarph 4:
                <input
                  css={inputStyles}
                  value={aboutinput.paragraph4}
                  disabled
                />
              </label>
              <label>
                External Link 1:
                <input
                  css={inputStyles}
                  value={aboutinput.externalLink1}
                  disabled
                />
              </label>
              <label>
                External Link 2:
                <input
                  css={inputStyles}
                  value={aboutinput.externalLink2}
                  disabled
                />
              </label>
              <br />
              <label>
                External Link 3:
                <input
                  css={inputStyles}
                  value={aboutinput.externalLink3}
                  disabled
                />
              </label>
              <button
                onClick={() => {
                  setActiveEdit(aboutinput.id);
                  setEditParagraphOne(aboutinput.paragraph1);
                  setEditParagraphThree(aboutinput.paragraph2);
                  setEditParagraphFour(aboutinput.paragraph3);
                  setEditParagraphTwo(aboutinput.paragraph4);
                  setEditExternalLinkTwo(aboutinput.externalLink2);
                  setEditExternalLinkThree(aboutinput.externalLink3);
                  setEditExternalLinkOne(aboutinput.externalLink1);
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

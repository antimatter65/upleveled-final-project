import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
// import { userInfo } from 'os';
// import Layout from '../../components/Layout';
import { getUserByValidSessionToken, User } from '../../utils/database';

// creating the dynamic page for private profile

const mainStyles = css`
  display: flex;
  position: relative;
  flex-direction: column;
  display: flex;
  color: white;
`;

const linkStyles = css`
  display: flex;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 85%;
  margin: 5%;
  height: 15px;
  color: white;
  font-size: 20px;
`;

const linkButtonStyles = css`
  display: flex;
  position: relative;
  justify-content: space-evenly;
  align-content: center;
  align-content: center;
  align-self: center;
  border: 3px solid white;
  width: 40%;
  border-radius: 15px;
  background-color: black;
  color: white;
  margin: 1%;
  margin-left: 3%;
  padding: 1%;
  opacity: 0.75;

  :hover {
    background-color: white;
    color: black;
  }
`;

const headerStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: 3%;
`;

const mainHeaderStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: 0%;
`;

// type props = {
//   user?: User | undefined;
// };

export default function UserPage(props: any) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>USER NOT FOUND!</title>
          <meta name="description" content="user not found" />
        </Head>
        <h1>USER NOT FOUND!</h1>
        <div>try again</div>
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>Edit Page</title>
        <meta name="description" content="private edit menu page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={mainStyles}>
        <h1 css={mainHeaderStyles}>Edit Menu</h1>
        <h2 css={headerStyles}>Whats Up {props.user.username}!?</h2>
        <h2 css={headerStyles}>What do you want to do today..?</h2>
        <div css={linkStyles}>
          <div css={linkButtonStyles}>
            <Link href="/users/add-new-release">Update Releases</Link>
          </div>
          <div css={linkButtonStyles}>
            <Link href="/users/add-tour-dates">Add DJ/Live Dates </Link>
          </div>
          <div css={linkButtonStyles}>
            <Link href="/users/edit-about">Add Profile Info </Link>
          </div>
          <div css={linkButtonStyles}>
            <Link href="/">Update Featured Mixes</Link>
          </div>
          <div css={linkButtonStyles}>
            <Link href="/">Change Contact Information</Link>
          </div>
          <div css={linkButtonStyles}>
            <Link href="/">Change Landing Page Video</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // for getUserByUsername parseInt is not

  // get just the sessionToken (without this all the cookie are returned) and set to equal to const user
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );

  // const user = await getUserByUserId(1);
  // console.log('what does user contain?', user);

  if (user) {
    return {
      props: {
        user: user,
      },
    };
  }
  // redirect to login page if not logged then return to the profile page after successfull log in
  return {
    redirect: {
      destination: '/login?returnTo=/users/private-page',
      permanent: false,
    },
  };
}

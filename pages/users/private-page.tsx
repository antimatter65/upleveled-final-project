import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
// import { userInfo } from 'os';
// import Layout from '../../components/Layout';
import { getUserByValidSessionToken, User } from '../../utils/database';

// creating the dynamic page for private profile

const linkStyles = css`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  color: white;
  padding: 0%;
`;

type props = {
  user?: User | undefined;
};

export default function UserPage(props: props) {
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
      <main css={linkStyles}>
        <br />
        <br />
        <h1>Edit Menu</h1>
        <h2>User #: {props.user.id}</h2>
        {/* <h2>Username: {props.user.username}</h2> */}
        <h2>Whats Up {props.user.username} what do you want to do today..?</h2>
        <div css={linkStyles}>
          <Link href="/users/add-new-release">Update Releases</Link>
          <br />
          <Link href="/users/add-tour-dates">Add DJ/Live Dates </Link>
          <br />
          <Link href="/users/edit-about">Add Profile Info </Link>
          <br />
          <Link href="/">Update Featured Mixes</Link>
          <br />
          <Link href="/">Change Contact Information</Link>
          <br />
          <Link href="/">Change Landing Page Video</Link>
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

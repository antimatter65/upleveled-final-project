import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FaTools } from 'react-icons/fa';
import { getUserByUserName, User } from '../../../util/database';

/// start again with creating the dynamic page

const bgText = css`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 5%;
  font-size: 24px;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;
  z-index: 0;
`;

const iconStyles = css`
  margin: 8%;
  padding: 1%;
  color: white;
  opacity: 0.75;
  width: 200px;
  height: 200px;
  :hover {
    color: black;
  }
`;

type Props = {
  user?: User | undefined;
};

export default function UserPage(props: Props) {
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
        <title>User Page</title>
        <meta name="users private page" content="user page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={bgText}>
        <h1>User Page</h1>
        <h2>
          User #: {props.user.id} (username: {props.user.username})
        </h2>
        <div>id: {props.user.id} </div>
        <div> username: {props.user.username}</div>
        <section css={bgText}>
          <h2>Whoops!</h2>
          <div>This Page Is Under Construction</div>
          <Link href="/">
            <FaTools css={iconStyles} />
          </Link>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const usernameFromUrl = context.query.username;

  // make sure that the query pramitter is a string

  if (!usernameFromUrl || Array.isArray(usernameFromUrl)) {
    return { props: {} };
  }

  // for getUserByUsername parseInt is not required
  const user = await getUserByUserName(usernameFromUrl);

  // console.log(user);

  if (!user) {
    context.res.statusCode = 404;
    return { props: {} };
  }

  return {
    props: {
      user: user,
    },
  };
}

// function getUserByUserName(arg0: number) {
//   throw new Error('Function not implemented.');
// }

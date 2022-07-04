import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getUserByUserName, User } from '../../../utils/database';

/// start again with creating the dynamic page

type props = {
  user?: User;
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
        <title>User Page</title>
        <meta name="description" content="user page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>User Page</h1>
        <h2>
          User #: {props.user.id} (username: {props.user.username})
        </h2>
        <div>id: {props.user.id} </div>
        <div> username: {props.user.username}</div>
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

  console.log(user);

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

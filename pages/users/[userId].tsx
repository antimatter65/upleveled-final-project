import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { userInfo } from 'os';
import Layout from '../../components/Layout';
import { getUserByUserId, User } from '../../utls/database';

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
  const userIdFromUrl = context.query.userId;

  // make sure that the query prameter is a string

  if (!userIdFromUrl || Array.isArray(userIdFromUrl)) {
    return { props: {} };
  }

  // for getUserByUsername parseInt is not required
  const user = await getUserByUserId(parseInt(userIdFromUrl));

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

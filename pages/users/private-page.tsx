import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
// import { userInfo } from 'os';
// import Layout from '../../components/Layout';
import { getUserByValidSessionToken, User } from '../../utls/database';

// creating the dynamic page for private profile

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
  // for getUserByUsername parseInt is not

  // get just the sessionToken (without this all the cookie are returned) and set to equal to const user
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );

  //const user = await getUserByUserId(1);

  console.log('what does user contain?', user);

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
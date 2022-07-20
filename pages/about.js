import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
// to change layout of page compare to what is defines in _app.js
// import Layout from '../components/Layout';
// import NestedLayout from '../components/nested-layout';
// import Link from 'next/link';
import aboutBackground from '../public/about-background.jpg';
import { getAboutInfo } from '../utils/database';

const backgroundImageStyles = css`
  display: flex;
  position: fixed;
  align-items: center;
  align-self: center;
  width: 80%;
  padding: 8%;
  margin-top: 5%;
  padding-top: 0;
  height: 80vh;
  width: 90vw;
  overflow: hidden;
  z-index: -1;
`;

const titleStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  z-index: 0;
  color: white;
  margin-bottom: 0%;
  text-shadow: 1px 1px 1px #3c5c5e;
  @media (max-width: 1000px) {
    margin-top: 20%;
  }
`;

const mainSectionStyles = css`
  display: flex;
  position: fixed;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1%;
  margin: 2%;
  margin-top: 0;
  z-index: 5;
  justify-content: flex-start;
  justify-content: space-evenly;
  max-height: 100%;
  @media (max-width: 1000px) {
  }
`;

const aboutSectionAllStyles = css`
  /* display: flex;
  position: fixed; */
  color: #ffffff;
  margin: 20%;
  margin-left: 15%;
  margin-top: 10%;
  flex-direction: column;
  @media (max-width: 1000px) {
    display: flex;
    position: relative;
    background-color: grey;
    width: 100%;
    margin: 0;

    margin-top: 15%;
    padding: 5% 5% 5% 5%;
  }
`;

export default function aboutPage(props) {
  return (
    <div>
      <Head>
        <title>ABOUT</title>
        <meta name="description" content="all locoda tour dates" />
        {/* <link rel="icon" href="/faviconmixtape.png" /> */}
      </Head>
      <h1 css={titleStyles}>About</h1>
      <main>
        <div css={mainSectionStyles}>
          <div css={backgroundImageStyles}>
            <Image
              src={aboutBackground}
              alt="bridges and canals in Manchester at night"
              width="1200"
              height="800"
            />
          </div>
          {props.aboutInfo.map((about) => {
            return (
              <section key={`release-${about.id}`} css={aboutSectionAllStyles}>
                <div>{about.paragraph1}</div>
                <br />
                <div> {about.paragraph2}</div>
                <br />
                <div> {about.paragraph3}</div>
                <br />
                <div>{about.paragraph4}</div>
                <br />
                <div>
                  <Link href={about.externalLink1}>{about.externalLink1}</Link>
                </div>
                <div>
                  <Link href={about.externalLink2}>{about.externalLink2}</Link>
                </div>
                <div>
                  <Link href={about.externalLink3}>{about.externalLink3}</Link>
                </div>
              </section>
            );
          })}
        </div>
        <div>
          {/* <div css={aboutSectionAllStyles}>
            Credit where it's due. We always hurt the ones we love.
          </div> */}
        </div>
      </main>
    </div>
  );
}

// Code in getServerSideProps runs in
// Node.js (on the server)
//
// Important: ONLY in the /pages directory
export async function getServerSideProps() {
  // from database.js
  const aboutInfo = await getAboutInfo();

  return {
    // Anything that you pass in the props
    // object will get passed to the component
    // at the top in the `props` parameter
    props: {
      // releases.: releases.Database,
      aboutInfo: aboutInfo,
    },
  };
}

// about.getLayout = function getLayout(page) {
//   return (
//     <Layout>
//       <NestedLayout>{page}</NestedLayout>
//     </Layout>
//   );
// };

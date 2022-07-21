import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

// react-youtube used due to eslint problems with requiring sandboxes for iframes
// import YouTube from 'react-youtube';

const mainVideoStyles = css`
  width: 100%;
  @media (max-width: 1000px) {
    position: absolute;
    top: 5px;
    left: 0%;
    width: 100%;
    height: 100%;
  }
`;

const youTubeVideoStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  @media (max-width: 1000px) {
    position: relative;
    margin-top: 20%;
    margin-bottom: 20%;
    padding-top: 50%;
    padding-left: 0%;
    overflow: hidden;
  }
`;

const mainStyles = css`
  // background-color: grey;
`;

const headerTextStyles = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;

  @media (max-width: 1000px) {
    margin-top: 10%;
    font-size: 10px;
  }
`;

const footerTextStyles = css`
  display: flex;
  font-size: 13px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;
`;

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Home(props: Props) {
  useEffect(() => {
    props.refreshUserProfile().catch(() => console.log('refresh user profile'));
  }, [props]);

  // const onPlayerReady: YouTubeProps['onReady'] = (event: any) => {
  //   // access to player in all event handlers via event.target
  //   event.target.pauseVideo();
  // };

  // const opts: YouTubeProps['opts'] = {
  //   height: '480',
  //   width: '880',
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 0,
  //   },
  // };

  return (
    <div>
      <Head>
        <title>LOCODA </title>
        <meta name="LOCODA" content="Welcome to the Locoda Website " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainStyles}>
        <br />
        <br />
        <br />
        <section css={headerTextStyles}>
          <h1>CLOSER OUT NOW</h1>
          <br />
          <h2>on Code Recordings</h2>
          <br />
        </section>

        <section css={mainVideoStyles}>
          <br />
          <div css={youTubeVideoStyles}>
            <iframe
              width="880"
              height="480"
              src="https://www.youtube.com/embed/HwwtvZ45PB4"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sandbox
            />
          </div>
          {/* <div css={youTubeVideoStyles}>
            <YouTube
              videoId="HwwtvZ45PB4"
              opts={opts}
              onReady={onPlayerReady}
            />
          </div> */}
        </section>
        <br />
        <section css={footerTextStyles}>
          <div>
            <Link css={footerTextStyles} href="https://ingrv.es/closer-bek-3">
              Stream |
            </Link>
          </div>
          <div>
            <Link href="https://www.beatport.com/release/closer/3708354">
              | Beatport |
            </Link>
          </div>
          <div>
            <Link href="https://coderecs.bandcamp.com/album/closer-closer-instrumental">
              | Bandcamp
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

import { css } from '@emotion/react';
import Link from 'next/link';
import { BsInstagram, BsSpotify } from 'react-icons/bs';
import { FaMixcloud } from 'react-icons/fa';
import { ImSoundcloud } from 'react-icons/im';
import { SiBeatport } from 'react-icons/si';

const footerStyles = css`
  position: relative;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 5%;
  @media (max-width: 1000px) {
    margin-top: 135%;
  }
`;

export const iconsSectionStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  color: white;
`;

export const iconStyles = css`
  margin-left: 3%;
  margin-right: 3%;
  padding: 1%;
  color: white;
  opacity: 0.75;
  width: 50px;
  height: 50px;
  z-index: 0;
  :hover {
    color: black;
  }
  @media (prefers-color-scheme: light) {
    color: #57387f;
    :hover {
      color: white;
      opacity: 0.5;
    }
  }
`;

// icons for links to instagram, streaming, and buy links using icons from react-icons, check the licences for future projects

export default function Footer() {
  return (
    <footer css={footerStyles}>
      {/* <div>©️ antimatter65 2022</div> */}
      <section css={iconsSectionStyles}>
        <Link href="https://www.mixcloud.com/locoda/">
          <FaMixcloud css={iconStyles} />
        </Link>
        <Link href="https://www.beatport.com/artist/locoda/1050341">
          <SiBeatport css={iconStyles} />
        </Link>
        <Link href="https://soundcloud.com/locodadnb">
          <ImSoundcloud css={iconStyles} />
        </Link>
        <Link href="https://www.instagram.com/locodadnb/">
          <BsInstagram css={iconStyles} />
        </Link>
        <Link href="https://open.spotify.com/artist/2zkTffsWfjclGCUNdLp1R4?si=4cDF_Jn1Qfeccby3quC0gA">
          <BsSpotify css={iconStyles} />
        </Link>
      </section>
      {/* <div>This website is for demonstration purposes only</div> */}
    </footer>
  );
}

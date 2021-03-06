import { css } from '@emotion/react';

// import Image from 'next/image';
// import darkbackground1 from '../public/darkbackground1.jpg';

const bgWrap = css`
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: -1;
  background-image: url('/darkbackground1.jpg');
  @media (max-width: 1000px) {
    background-image: url('/darkbackground1cropped.png');
  }
  @media (prefers-color-scheme: light) {
    background-image: url('/lightbackground2.jpg');
  }

  @media (max-width: 1000px) and (prefers-color-scheme: light) {
    background-image: url('/light-background-cropped.png');
  }
`;

export default function Background() {
  return (
    <div>
      <div css={bgWrap}>
        {/* <Image
          alt="green and pink smoke on black background"
          src={darkbackground1}
          layout="fill"
          objectFit="cover"
          quality={100}
        /> */}
      </div>
    </div>
  );
}

import { css } from '@emotion/react';
import Image from 'next/image';
import lightbackground1 from '../public/lightbackground1.jpeg';

const bgWrap = css`
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: -1;
  // border: 1px green solid;
`;

export default function BackgroundLight() {
  return (
    <div>
      <div css={bgWrap}>
        <Image
          alt="Mountains"
          src={lightbackground1}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </div>
  );
}

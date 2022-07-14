import { css } from '@emotion/react';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import darkbackground1 from '../public/darkbackground1.jpeg';
import lightbackground1 from '../public/lightbackground1.jpeg';

const bgWrap = css`
  position: fixed;
  color: white;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: -1;
  // border: 1px green solid;
`;

export default function BackgroundLight() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

  return (
    <div>
      <div css={bgWrap}>
        <div>
          {isTabletOrMobile && (
            <Image
              alt="Mountains"
              src={lightbackground1}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          )}
        </div>
        <div>
          {isDesktopOrLaptop && (
            <Image
              alt="Mountains"
              src={darkbackground1}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          )}
        </div>
      </div>
    </div>
  );
}

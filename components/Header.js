import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import headerbackground from '../public/HeaderBackground.jpeg';

// import { getParsedCookie } from '../util/cookies';

const headerStyles = css`
  color: grey;
  position: static;
  z-index: 5;
  width: 100vw;
  height: 100px;
  background: white;
  opacity: 0.95;
  border-bottom: grey 1px solid;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: grey;
`;

const headerlogo = css`
  display: flex;
  position: relative;
`;

const headerLinkContainerStyles = css`
  display: flex;
  position: relative;
`;

const headerLinkStyles = css`
  /*   border: white 1px solid;
 */
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 4px;
  border-color: grey solid 1px;
  color: grey;
  background-color: white;
  width: 150px;
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
  text-decoration: none;
  box-shadow: #5e5df0 0 10px 20px -10px;
  :hover {
    color: white;
    background: grey;
    text-decoration-color: grey;
    border-color: grey;
  }
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      {/* adds a home link to the image in the header */}
      <div css={headerlogo}>
        <Link href="/">
          <Image
            src={headerbackground}
            alt="header background locodo logo"
            height="200"
            width="2000"
          />
        </Link>
      </div>
      <div css={headerLinkContainerStyles}>
        <div css={headerLinkStyles}>
          <Link href="/">Home</Link>
        </div>
        <div css={headerLinkStyles}>
          <Link href="/login">Login</Link>
        </div>
        <div css={headerLinkStyles}>
          <Link href="/register">Register</Link>
        </div>
        <div css={headerLinkStyles}>
          <Link href="/merch">Merch</Link>
        </div>
      </div>
    </header>
  );
}

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
  height: 230px;
  background: white;
  opacity: 0.95;
  border-bottom: grey 1px solid;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: grey;
`;

const headerlogo = css`
  display: flex;
  position: relative;
  margin-top: 0%;
`;

const headerLinkContainerStyles = css`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 0.1%;
`;

const headerLinkStyles = css`
  border: grey 1px solid;

  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 2%;
  margin-bottom: 2%;
  border-radius: 4px;
  border-color: grey solid 1px;
  color: grey;
  background-color: white;
  width: 150px;
  padding-top: 0;
  padding-left: 20px;
  padding-right: 20px;
  text-decoration: none;
  box-shadow: #d3f71b 0 20px 40px -20px;
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
          <div>
            <Image
              src={headerbackground}
              alt="header background locodo logo"
              height="300"
              width="2000"
            />
          </div>
        </Link>
      </div>
      <div css={headerLinkContainerStyles}>
        <div css={headerLinkStyles}>
          <Link href="/">Home</Link>
        </div>
        <div css={headerLinkStyles}>
          <Link href="/tourdates">Live/DJ</Link>
        </div>
        <div css={headerLinkStyles}>
          <Link href="/releases">Releases</Link>
        </div>
        <div css={headerLinkStyles}>
          <Link href="/merch">Merch</Link>
        </div>

        <div css={headerLinkStyles} href="/login">
          <Link href="/login">Login</Link>
        </div>
        <div css={headerLinkStyles}>
          <Link href="/register">Register</Link>
        </div>
        <div css={headerLinkStyles}>
          <Link href="/user/private-page">Profile</Link>
        </div>
        {/* <div css={headerLinkStyles}>
          <Link href="/users/private-page">{props.user.username}</Link>
        </div> */}
        <div css={headerLinkStyles}>
          <Link href="/logout">Logout</Link>
        </div>
      </div>
    </header>
  );
}

import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
// import headerbackground from '../public/HeaderBackground.jpeg';
import whitelogo from '../public/whitelogo.png';

// import { getParsedCookie } from '../util/cookies';

const headerStyles = css`
  color: grey;
  position: static;
  z-index: 5;
  width: 100%;
  height: 5%;
  background: #000000;
  opacity: 0.95;
  border-bottom: grey 1px solid;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  // background-color: grey;
`;

const headerlogo = css`
  display: flex;
  position: relative;
  margin-top: 0%;
  position: fixed;
  z-index: 10;
`;

const headerLinkContainerStyles = css`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 0.1%;
  width: 20%;
  margin-left: 80%;
  z-index: 10;
`;

const headerLinkStyles = css`
  z-index: 10;
  border: grey 1px solid;
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 1%;
  margin-bottom: 2%;
  border-radius: 4px;
  border-color: grey solid 1px;
  color: grey;
  background-color: white;
  width: 80%;
  padding-top: 0%;
  padding-left: 20px;
  padding-right: 20px;
  text-decoration: none;
  box-shadow: #d3f71b 0 20px 40px -20px;
  //position: fixed;
  :hover {
    color: white;
    background: grey;
    text-decoration-color: grey;
    border-color: grey;
  }
`;
const headerLogoStyles = css`
  width: 50%;
  margin-left: 10%;
`;

export default function Header(props) {
  return (
    <header css={headerStyles}>
      {/* adds a home link to the image in the header */}
      <div css={headerlogo}>
        <Link href="/">
          <div css={headerLogoStyles}>
            <Image
              src={whitelogo}
              alt="header background locodo logo"
              // height="300"
              // width="2000"
            />
          </div>
        </Link>
      </div>
      <div css={headerLinkContainerStyles}>
        <div css={headerLinkStyles}>
          <Link href="/">Home</Link>
        </div>
        <div css={headerLinkStyles}>
          <Link href="/live-dj">Live/DJ</Link>
        </div>
        <div css={headerLinkStyles}>
          <Link href="/releases">Releases</Link>
        </div>
        <div css={headerLinkStyles}>
          <Link href="/mixes">Mixes</Link>
        </div>
        <div css={headerLinkStyles}>
          <Link href="/about/">About</Link>
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
          <Link href="/contact/">Contact/Booking</Link>
        </div>
        <div css={headerLinkStyles}>{props.user && props.user.username}</div>
        <div css={headerLinkStyles}>
          <Link href="/users/private-page">Edit Data:</Link>
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

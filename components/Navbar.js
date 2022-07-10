import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import whitelogo from '../public/whitelogo.png';

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
  margin-top: 0.5%;
  position: fixed;
  z-index: 10;
`;

const headerLinkContainerStyles = css`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 10%;
  width: 20%;
  margin-left: 0%;
  z-index: 10;
  // border: red 20px solid;
`;

const headerLinkStyles = css`
  z-index: 10;
  display: flex;
  position: relative;
  justify-content: flex-start;
  flex-direction: row;
  margin-top: 1%;
  margin-bottom: 2%;
  color: #beceb4;
  padding-top: 0%;
  padding-right: 100%;
  width: 400px;
  font-size: 32px;

  text-decoration: none;
  // #d3f71b

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

const navBarStyles = css`
  display: flex;
  position: relative;
`;

// const navBar = css`
//   position: relative;
// `;

const buttonContainerStyles = css`
  margin-left: 60%;
  right: 0;
  border: none;
  background-color: none;
  z-index: 10;
`;

const navMenuButtonStyles = css`
  position: relative;
  display: flex;
  color: #beceb4;
  background-color: none;
  width: 40px;
  height: 40px;
  background-color: none;
  z-index: 10;
  margin-left: 1500%;
`;

const navMenuButtonClosedStyles = css`
  position: relative;
  display: flex;
  color: #beceb4;
  background-color: none;
  width: 500%;
  height: 100%;
  z-index: 10;
  margin-left: 800%;
`;

export default function Navbar(props) {
  // useState
  const [navbarOpen, setNavbarOpen] = useState(false);
  // const handleToggle = () => {
  //   setNavbarOpen((prev) => !prev);
  // };

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  // function to close nav bar onClick of links
  const closeMenu = () => {
    setNavbarOpen(false);
  };

  return (
    <nav css={navBarStyles}>
      <br />
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
      <button css={buttonContainerStyles} onClick={handleToggle}>
        {navbarOpen ? (
          <MdClose css={navMenuButtonClosedStyles} />
        ) : (
          <FiMenu
            css={navMenuButtonStyles}
            // style={{
            //   color: '#BECEB4',
            //   width: '40px',
            //   height: '40px',
            //   background: '',
            // }}
          />
        )}
      </button>
      {/* <button onClick={handleToggle}>{navbarOpen ? 'Close' : 'Open'}</button> */}
      <ul className={`menuNav ${navbarOpen ? ' showMenu' : ''}`}>
        <div css={headerLinkContainerStyles}>
          <div css={headerLinkStyles}>
            <Link href="/" onClick={() => closeMenu()}>
              Home
            </Link>
          </div>
          <div css={headerLinkStyles}>
            <Link href="/live-dj" onClick={() => closeMenu()}>
              Live/DJ
            </Link>
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
          <div css={headerLinkStyles}>
            <Link href="/contact/">Contact/Booking</Link>
          </div>
          <div css={headerLinkStyles} href="/login">
            <Link href="/login">Login</Link>
          </div>
          <div css={headerLinkStyles}>
            <Link href="/register">Register</Link>
          </div>

          <div css={headerLinkStyles}>
            <Link href="/users/private-page">Edit Data</Link>
          </div>
          {/* <div css={headerLinkStyles}>
          <Link href="/users/private-page">{props.user.username}</Link>
        </div> */}
          <div css={headerLinkStyles}>
            <Link href="/logout">Logout</Link>
          </div>
        </div>
        <div css={headerLinkStyles}>{props.user && props.user.username}</div>
      </ul>
    </nav>
  );
}

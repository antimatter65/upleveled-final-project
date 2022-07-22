import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import whitelogo from '../public/whitelogo.png';

const headerlogo = css`
  display: flex;
  position: relative;
  position: fixed;
  z-index: 10;
  padding: 2%;
  background: transparent;
  border: none;
  color: black;
  // this change the header logo from white to black
  @media (prefers-color-scheme: light) {
    filter: invert(1);
  }
  :hover {
    filter: invert(0.5);
  }
  @media (max-width: 1000px) {
    padding-left: 20%;
    margin-top: 2%;
  }
`;

const headerLinkContainerStyles = css`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 10%;
  width: 20%;
  margin-left: 0%;
  z-index: 10;

  @media (max-width: 1000px) {
    margin-top: 30%;
  }
`;

const headerLinkStyles = css`
  z-index: 10;
  display: flex;
  position: relative;
  justify-content: flex-start;
  flex-direction: row;
  margin-top: 1%;
  margin-bottom: 2%;
  margin-left: 60%;
  color: white;
  padding-top: 0%;
  padding-right: 100%;
  width: 400px;
  font-size: 18px;
  text-decoration: none;
  @media (max-width: 1000px) {
    font-size: 16px;
    justify-content: center;
    margin-top: 5%;
  }
  @media (prefers-color-scheme: light) {
    color: white;
  }
`;

const headerLinkButtonStyles = css`
  z-index: 10;
  display: flex;
  position: relative;
  justify-content: flex-start;
  flex-direction: row;
  margin-top: 3%;
  margin-bottom: 2%;
  color: white;
  padding-top: 12%;
  margin-left: 50%;
  padding-right: 100%;
  width: 400px;
  font-size: 28px;
  text-decoration: none;
  background: transparent;
  border: none;
  font-family: Lexend Zetta;

  :hover {
    border-color: grey;
    color: yellowgreen;
  }

  @media (prefers-color-scheme: light) {
    color: white;
    :hover {
      color: #57387f;
    }
  }

  @media (max-width: 1000px) {
    justify-content: center;
    padding-top: 15%;
    margin: 5%;
  }

  @media (max-width: 400px) {
    font-size: 20px;
  }
`;

const headerLogoStyles = css`
  width: 50%;
  margin-left: 10%;
`;

const navBarStyles = css`
  display: flex;
  position: relative;
  margin-top: 0%;
  height: 0%;
  z-index: 10;
  padding-top: 0%;
`;

const buttonContainerStyles = css`
  position: fixed;
  margin-left: 60%;
  right: 0%;
  margin-top: 0%;
  margin-bottom: 0%;
  border: none;
  padding-top: 0%;
  box-shadow: none;
  background-color: black;
  background: transparent;
  z-index: 10;
  padding: 1%;
`;

const navMenuButtonStyles = css`
  position: relative;
  display: flex;
  color: yellowgreen;
  background-color: none;
  width: 40px;
  height: 40px;
  background-color: none;
  z-index: 10;
  @media (prefers-color-scheme: light) {
    color: white;
    :hover {
      color: #57387f;
    }
  }
  @media (max-width: 1000px) {
  }
`;

const navMenuButtonClosedStyles = css`
  position: relative;
  display: flex;
  color: white;
  background-color: none;
  width: 100%;
  height: 40px;
  background-color: none;
  z-index: 10;
  :hover {
    color: yellowgreen;
    @media (prefers-color-scheme: light) {
      color: white;
      :hover {
        color: #57387f;
      }
    }
  }
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
  function closeMenu() {
    setNavbarOpen(false);
    console.log('is this onclick doing anything?');
  }

  return (
    <div css={navBarStyles}>
      <br />
      <button css={headerlogo} onClick={() => closeMenu()}>
        <Link href="/">
          <div css={headerLogoStyles}>
            <Image
              src={whitelogo}
              alt="header background locodo logo"
              layout="fill"
            />
          </div>
        </Link>
      </button>
      <button css={buttonContainerStyles} onClick={handleToggle}>
        {navbarOpen ? (
          <MdClose css={navMenuButtonClosedStyles} />
        ) : (
          <FiMenu css={navMenuButtonStyles} />
        )}
      </button>
      {/* <button onClick={handleToggle}>{navbarOpen ? 'Close' : 'Open'}</button> */}
      <ul
        className={`menuNav ${navbarOpen ? ' showMenu' : ''}`}
        // css={{`menuNav ${navbarOpen ? ' showMenu' : ''}`}}
      >
        <div css={headerLinkContainerStyles}>
          <button css={headerLinkButtonStyles} onClick={() => closeMenu()}>
            <Link href="/">Home</Link>
          </button>
          <button css={headerLinkButtonStyles} onClick={() => closeMenu()}>
            <Link href="/live-dj" onClick={() => closeMenu()}>
              Live/DJ
            </Link>
          </button>
          <button css={headerLinkButtonStyles} onClick={() => closeMenu()}>
            <Link href="/releases">Releases</Link>
          </button>
          <button css={headerLinkButtonStyles} onClick={() => closeMenu()}>
            <Link href="/mixes">Mixes</Link>
          </button>
          <button css={headerLinkButtonStyles} onClick={() => closeMenu()}>
            <Link href="/about/">About</Link>
          </button>
          <button css={headerLinkButtonStyles} onClick={() => closeMenu()}>
            <Link href="/merch">Merch</Link>
          </button>
          <button css={headerLinkButtonStyles} onClick={() => closeMenu()}>
            <Link href="/contact/">Contact/Booking</Link>
          </button>
          {!props.user ? (
            <button css={headerLinkButtonStyles} onClick={() => closeMenu()}>
              <Link href="/login">Login</Link>
            </button>
          ) : (
            <div />
          )}
          {!props.user ? (
            <button css={headerLinkButtonStyles} onClick={() => closeMenu()}>
              <Link href="/register">Register</Link>
            </button>
          ) : (
            <div />
          )}
          {props.user ? (
            <button css={headerLinkButtonStyles} onClick={() => closeMenu()}>
              <Link href="/users/private-page">Edit Data</Link>
            </button>
          ) : (
            <div />
          )}
          {props.user ? (
            <button css={headerLinkButtonStyles} onClick={() => closeMenu()}>
              <Link href="/logout">Logout</Link>
            </button>
          ) : (
            <div />
          )}
          <br />
          <br />
          <div css={headerLinkStyles}>
            {props.user ? 'logged in as user:' : '  '}
          </div>
          {props.user ? (
            <button css={headerLinkButtonStyles} onClick={() => closeMenu()}>
              <Link href={`/users/byname/${props.user.username}`}>
                {props.user && props.user.username}
              </Link>
            </button>
          ) : (
            <div />
          )}
          <br />
          <br />
          {/* <button css={toggleButtonStyles}>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </button> */}
        </div>
      </ul>
    </div>
  );
}

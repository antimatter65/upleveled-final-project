import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { MdFacebook, MdOutlineMail } from 'react-icons/md';
import { titleStyles } from './releases';

// import styles from '../styles/Home.module.css';

const headerText = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: none;
  margin-top: 5%;
  text-shadow: 1px 1px 1px #3c5c5e;
  z-index: 0;
  color: white;
  @media (max-width: 1000px) {
    margin-top: 10%;
    font-size: 10px;
  }
`;

const iconStyles = css`
  margin-left: 3%;
  margin-right: 3%;
  margin-bottom: 0;
  padding: 1%;
  color: white;
  opacity: 0.75;
  width: 60px;
  height: 60px;
  :hover {
    color: black;
  }
`;

const iconStylesEmail = css`
  margin-left: 3%;
  margin-right: 3%;
  margin-bottom: 0;
  padding: 1%;
  color: white;
  opacity: 0.75;
  width: 100px;
  height: 100px;
  :hover {
    color: black;
  }
`;

const linkSectionStyles = css`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;
`;

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Contact(props: Props) {
  useEffect(() => {
    props.refreshUserProfile().catch(() => console.log('refresh user profile'));
  }, [props]);

  return (
    <div>
      <Head>
        <title> LOCODA | Contact Page</title>
        <meta
          name="contact page"
          content="contact email and social media links"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 css={titleStyles}>Contact and Bookings:</h1>
        <section>
          <h2 css={headerText}>For Booking and Inquires please contact:</h2>
          <br />
          <section css={linkSectionStyles}>
            <Link href="mailto:locodabookings@email.com">
              <MdOutlineMail css={iconStylesEmail} />
            </Link>
            <div>E-mail: locodabookings@email.com</div>
            <h2 css={headerText}>To keep upto date follow Locoda here:</h2>
            <br />
            <div>
              <Link href="https://www.instagram.com/locodadnb/">
                <FaInstagram css={iconStyles} />
              </Link>
            </div>
            <div>
              <Link href="https://www.instagram.com/locodadnb/">
                Instagram: https://www.instagram.com/locodadnb/
              </Link>
            </div>
            <br />
            <div>
              <Link href="https://www.facebook.com/locodadnb">
                <MdFacebook css={iconStyles} />
              </Link>
            </div>
            <div>
              <Link href="https://www.facebook.com/locodadnb">
                Facebook: https://www.facebook.com/locodadnb
              </Link>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

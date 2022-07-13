import { css } from '@emotion/react';
// import Image from 'next/image';
import { Component } from 'react';
import Background from './Background';
import BackgroundLight from './BackgroundLight';
// import darkbackground from '../public/dark-background-2.jpeg';
import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';

export default function Layout(props) {
  return (
    <div>
      {/* <Image
        src={darkbackground}
        alt="green and pink smoke"
        css={backgroungImageStyles}
        //layout="fill"
      /> */}
      <div>
        {/* <Header
          user={props.user}
          refreshUserProfile={props.refreshUserProfile}
        /> */}
        <Background />
        {/* <BackgroundLight /> */}
        <Navbar
          user={props.user}
          refreshUserProfile={props.refreshUserProfile}
        />
        {/* <img
          src="../public/light-background-1.jpeg"
          alt="light background"
          width="500"
          height="600"
        /> */}
        {/* <Image
          src={darkbackground}
          alt="green and pink smoke"
          css={backgroungImageStyles}
          // layout="fill"
        /> */}
        {
          // Page content
          props.children
        }
        <Footer />
      </div>
    </div>
  );
}

import { Component } from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    // <body>
    <div>
      <Header user={props.user} refreshUserProfile={props.refreshUserProfile} />
      {
        // Page content
        props.children
      }
      <Footer />
    </div>
    // </body>
  );
}

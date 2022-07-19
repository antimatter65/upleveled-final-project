import Background from './Background';
import Footer from './Footer';
// import Header from './Header';
import Navbar from './Navbar';

export default function Layout(props) {
  return (
    <div>
      <div>
        <Background />
        <Navbar
          user={props.user}
          refreshUserProfile={props.refreshUserProfile}
        />
        {
          // Page content
          props.children
        }
        <Footer />
      </div>
    </div>
  );
}

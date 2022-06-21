import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    // <body>
    <div>
      <Header
        cart={props.cart}
        itemInCart={props.itemInCart}
        setItemInCart={props.setItemInCart}
      />
      {
        // Page content
        props.children
      }
      <Footer />
    </div>
    // </body>
  );
}

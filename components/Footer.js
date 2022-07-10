import { css } from '@emotion/react';
import Link from 'next/link';

const footerStyles = css`
  position: relative;
  padding: 8px 14px;
  height: 50px;
  background: white;
  border-radius: 10px;
  margin-top: 30px;
  font-size: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  > div > a + a {
    margin-left: 30px;
  }
`;

const footerLinkStyles = css`
  /*   border: white 1px solid;
 */
  display: flex;
  position: relative;
  font-size: 5px;
  a {
    border-radius: 4px;
    color: black;
    width: 200px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0px;
    text-decoration: none;
  }
  a:hover {
    color: white;
    background: black;
  }
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      ©️ antimatter65 2022
      <div>This website is for demonstration purposes only</div>
      <div css={footerLinkStyles}>
        {/* <div css={footerLinkStyles}> */}
        <div>
          <Link href="/">home</Link>
        </div>
        {/* </div> */}
        <div>
          {/* <div css={footerLinkStyles}> */}
          <Link href="/faq">faq</Link>
        </div>
        {/* </div> */}
        <div>
          {/* <div css={footerLinkStyles}> */}
          <Link href="/contact">contact</Link>
          {/* </div> */}
        </div>
      </div>
    </footer>
  );
}

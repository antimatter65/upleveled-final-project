import { css } from '@emotion/react';
import Head from 'next/head';
// import Link from 'next/link';
import { useState } from 'react';
// import { getUserByValidSessionToken, User } from '../../utils/database';
import { buttonStyles } from '../releases';

// import styles from '../styles/Home.module.css';

const bgText = css`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 5%;
  font-size: 24px;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;
  z-index: 0;
`;

const imageStyles = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  align-self: center;
  justify-items: center;
  max-width: 30%;
`;

const jsonDataCss = css`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 5%;
  font-size: 15px;
  color: white;
  text-shadow: 1px 1px 1px #3c5c5e;
  z-index: 0;
  background-color: grey;
  opacity: 0.8;
  width: 110%;
`;

export default function Home() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'locoda-uploads');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dfmmykkmb/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  return (
    <div css={bgText}>
      <Head>
        <title>Image Uploader</title>
        <meta name="uploader" content="Upload album art to cloudinary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 css={bgText}>Image Uploader</h1>

        <form method="POST" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input css={bgText} type="file" name="file" />
          </p>

          <img css={imageStyles} src={imageSrc} alt="" />

          {imageSrc && !uploadData && (
            <p>
              <button css={buttonStyles}>Upload Album Art</button>
            </p>
          )}

          {uploadData && (
            <code>
              <pre css={jsonDataCss}>{JSON.stringify(uploadData, null, 2)}</pre>
              {/* {let newurl = JSON.parse(uploadData, null, 2)}
              <div css={jsonDataCss}>{newurl.url}</div> */}
              <div css={jsonDataCss}>Image Uploaded!</div>
            </code>
          )}
        </form>
      </main>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   // for getUserByUsername parseInt is not

//   // get just the sessionToken (without this all the cookie are returned) and set to equal to const user
//   const user = await getUserByValidSessionToken(
//     context.req.cookies.sessionToken,
//   );

//   // const user = await getUserByUserId(1);
//   // console.log('what does user contain?', user);

//   if (user) {
//     return {
//       props: {
//         user: user,
//       },
//     };
//   }
//   // redirect to login page if not logged then return to the profile page after successful log in
//   return {
//     redirect: {
//       destination: '/login?returnTo=/users/uploader',
//       permanent: false,
//     },
//   };
// }

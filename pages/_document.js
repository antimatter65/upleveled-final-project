import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend+Zetta&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Welcome to the Locoda Website, new Drum and Bass artist/DJ/Producer form Manchester Uk. Closer out now on code recordings "
        />
        <meta
          name="keywords"
          content="Locoda, Drum and Bass, DnB, Drum and Bass, Manchester, DJ, Producer, Code Recordings"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

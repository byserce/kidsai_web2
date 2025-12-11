import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="tr" className="scroll-smooth">
      <Head>
        <title>Gizlilik Kalkanı</title>
        <meta
          name="description"
          content="Yapay zeka destekli gizlilik politikası oluşturucu"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import React from "react";
import Document, { Head, Main, NextScript, Html } from "next/document";
import { extractStyles } from "evergreen-ui";

interface DocumentProps {
  css: string;
  hydrationScript: React.ReactChild;
}

export default class MyDocument extends Document<DocumentProps> {
  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const { css, hydrationScript } = extractStyles();

    return {
      ...page,
      css,
      hydrationScript
    };
  }

  render() {
    const { css, hydrationScript } = this.props;

    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="google-site-verification"
            content="bjJSOEahdert-7mwVScrwTTUVR3nSe0bEj5YjevUNn0"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/site.webmanifest" />
          <meta
            property="og:title"
            content="Transform | A polyglot web converter"
          />
          <meta property="og:image" content="/static/transform.png" />
          <meta property="og:url" content="https://transform.tools" />
          <meta name="twitter:card" content="summary_large_image" />
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </Head>

        <body>
          <Main />
          {hydrationScript}
          <NextScript />
        </body>
      </Html>
    );
  }
}

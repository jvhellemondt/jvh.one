import React, { ReactElement } from 'react';

interface IProps {
  htmlAttributes: {
    lang: string
  }
  headComponents: ReactElement[]
  preBodyComponents: ReactElement[]
  body: string
  postBodyComponents: ReactElement[]
}

const HTML = (props: IProps): ReactElement => {
  const {
    htmlAttributes,
    headComponents,
    preBodyComponents,
    body,
    postBodyComponents,
  } = props;

  return (
    <html lang={htmlAttributes.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="" />
        {headComponents}
      </head>

      <body>
        {preBodyComponents}
        <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
        {postBodyComponents}
      </body>
    </html>
  );
};

export default HTML;

import React, {ReactElement} from 'react'

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
    const {htmlAttributes, headComponents, preBodyComponents, body, postBodyComponents} = props

    return (
        <html lang={htmlAttributes.lang}>
        <head>
            <meta charSet="utf-8"/>
            <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin=""/>
            {headComponents}
        </head>

        <body className="light">
        <script
            dangerouslySetInnerHTML={{
                __html: `
              (function() {
                window.__onThemeChange = function() {};
                function setTheme(newTheme) {
                  window.__theme = newTheme;
                  preferredTheme = newTheme;
                  document.body.className = newTheme;
                  window.__onThemeChange(newTheme);
                }
                var preferredTheme;
                try {
                  preferredTheme = localStorage.getItem('theme');
                } catch (err) { }
                window.__setPreferredTheme = function(newTheme) {
                  setTheme(newTheme);
                  try {
                    localStorage.setItem('theme', newTheme);
                  } catch (err) {}
                }
                var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                darkQuery.addListener(function(e) {
                  window.__setPreferredTheme(e.matches ? 'dark' : 'light')
                });
                setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
              })();
            `,
            }}
        />
        {preBodyComponents}
        <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{__html: body}}/>
        {postBodyComponents}
        </body>
        </html>
    )
}

export default HTML

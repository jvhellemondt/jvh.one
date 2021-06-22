import React, { ReactElement, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { useLocation } from '@reach/router';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import * as style from './style.module.scss';
import ThemeToggle from '../ThemeToggle/theme-toggle';

export const query = graphql`
    query GetSiteMetadataHeader {
        site {
            siteMetadata {
                title
            }
        }
    }
`;

export default function Header(): ReactElement {
  const [theme, setTheme] = useState('dark');
  const data = useStaticQuery(query);

  const { pathname } = useLocation();
  const handleThemeChange = () => {
    window.__setPreferredTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setTheme(window.__theme);
    window.__onThemeChange = () => {
      setTheme(window.__theme);
    };
  }, []);

  return (
    <>
      <Helmet meta={[{
        name: 'theme-color',
        content: theme
      }]}
      />
      <header className={classNames(style.header, style.header__container)}>
        {pathname === '/'
        || (
          <div className={classNames(style.header, style.header__left)}>
            <Link to="/">
              &larr;&nbsp;
              {data.site?.siteMetadata.title}
            </Link>
          </div>
        )}

        <div className={classNames(style.header, style.header__right)}>
          <ThemeToggle handleClick={handleThemeChange} dark={theme === 'dark'} />
        </div>
      </header>
    </>
  );
}

import React, { ReactElement, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { useLocation } from '@reach/router';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import * as style from './style.module.scss';
import ThemeToggle from '../../base/ThemeToggle/theme-toggle';
import { Maybe } from '../../../../graphql-types';
import useTheme from '../../../hooks/useTheme';

export const query = graphql`
    query GetSiteMetadataHeader {
        site {
            siteMetadata {
                title
            }
        }
    }
`;

export type HeaderProps = {
  subtitle?: Maybe<string>
}

export default function Header({ subtitle }: HeaderProps): ReactElement {
  const { site } = useStaticQuery(query);
  const pageTitle = subtitle
    ? `${subtitle} - ${site?.siteMetadata.title}`
    : site?.siteMetadata.title;

  const { pathname } = useLocation();
  const [theme, handleThemeToggle] = useTheme();

  return (
    <>
      <Helmet
        title={pageTitle}
        meta={[{
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
              {site?.siteMetadata.title}
            </Link>
          </div>
        )}

        <div className={classNames(style.header, style.header__right)}>
          <ThemeToggle handleClick={handleThemeToggle} dark={theme === 'dark'} />
        </div>
      </header>
    </>
  );
}

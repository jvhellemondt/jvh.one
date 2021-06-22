import React, { ReactElement, ReactNode } from 'react';
import { Main } from '../components/base';
import Header from '../components/jvh.one/Header/header';
import * as style from './style.module.scss';
import Author from '../components/jvh.one/Author';
import { Maybe } from '../../graphql-types';
import Footer from '../components/jvh.one/Footer';

interface IProps {
  subtitle?: Maybe<string>
  withAuthor?: boolean
  children: ReactNode
}

export default function Layout({
  subtitle,
  withAuthor = true,
  children,
}: IProps): ReactElement {
  return (
    <div className={style.app}>
      <Header subtitle={subtitle} />
      { withAuthor && <Author /> }
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}

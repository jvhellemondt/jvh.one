import React, { ReactElement, ReactNode } from 'react';
import { Main } from '../components/base';
import Header from '../components/jvh.one/Header/header';
import * as style from './style.module.scss';

interface IProps {
  title: string
  children: ReactNode
}

export default function Layout({
  title,
  children,
}: IProps): ReactElement {
  return (
    <div className={style.app}>
      <Header />
      <Main>{children}</Main>
    </div>
  );
}

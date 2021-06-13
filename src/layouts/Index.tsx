import React, { ReactElement, ReactNode } from 'react';
import * as style from './style.module.scss';
import Header from '../components/jvh.one/Header';
import { Main } from '../components/base/Template';

interface IProps {
  title: string
  children: ReactNode
}

const Layout = ({
  title,
  children,
}: IProps): ReactElement => {
  console.log(title);
  return (
    <div className={style.app}>
      <Header />
      <Main>{children}</Main>
    </div>
  );
};

export default Layout;

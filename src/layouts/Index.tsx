import React, { ReactElement, ReactNode } from 'react';
import './index.scss';
import Header from '../components/jvh.one/Header';

interface IProps {
  pageName: string
  children: ReactNode
}

const Layout = ({
  pageName,
  children,
}: IProps): ReactElement => {
  console.log(pageName);
  return (
    <div id="app">
      <Header />
      <main className="main">{children}</main>
    </div>
  );
};

export default Layout;

import React, { PureComponent, ReactElement, ReactNode } from 'react'
import './index.scss'
import Header from "../components/jvh.one/Header";

interface IProps {
  pageName: string,
  children: ReactNode
}

export default class Layout extends PureComponent<IProps> {
  
  render(): ReactElement {
    const { children } = this.props
    return (
      <div id='app'>
        <Header />
        <main className={ 'main' }>
          { children }
        </main>
      </div>
    )
    
  }
}

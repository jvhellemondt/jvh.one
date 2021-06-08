import React, {ReactElement, ReactNode} from 'react'
import './index.scss'
import Header from "../components/jvh.one/Header";

interface IProps {
    pageName: string,
    children: ReactNode
}

const Layout = ({children}: IProps): ReactElement => {
    return (
        <div id='app'>
            <Header/>
            <main className={'main'}>
                {children}
            </main>
        </div>
    )
}

export default Layout

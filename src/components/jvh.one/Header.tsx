import * as React from 'react'
import Toggle from "./Toggle";
import './Header.scss'
import { Helmet } from "react-helmet";
import { graphql, Link, StaticQuery } from "gatsby";
import { LinkGetProps } from 'reach__router'

interface IState {
  theme: string
}

const query = graphql`
    query GetSiteMetadataHeader {
        site {
            siteMetadata {
                title
            }
        }
    }
`;

export default class Header extends React.Component<Record<string, unknown>, IState> {
  constructor(props: Record<string, unknown>) {
    super(props)
    this.state = { theme: '' }
    this.handleThemeChange = this.handleThemeChange.bind(this)
  }
  
  componentDidMount() {
    // @ts-ignore
    this.setState({ theme: window.__theme });
    // @ts-ignore
    window.__onThemeChange = () => {
      // @ts-ignore
      this.setState({ theme: window.__theme });
    };
  }
  
  handleThemeChange() {
    // @ts-ignore
    window.__setPreferredTheme(
      this.state.theme === 'dark' ? 'light' : 'dark'
    )
  }
  
  render(): React.ReactNode {
    return (
      <StaticQuery
        query={ query }
        render={ data => {
          const { siteMetadata: { title } } = data.site;
          const isHome = (props: LinkGetProps): boolean => props.isCurrent
          return (
            <>
              <Helmet meta={ [ { name: 'theme-color', content: this.state.theme, }, ] }/>
              <header className="header header__container">
                {
                  !isHome && <div className="header header__left">
                    <Link to={ "/" } getProps={ isHome }> &larr; { title } </Link>
                  </div>
                }
                
                <div className="header header__right">
                  <Toggle handleClick={ this.handleThemeChange } dark={ this.state.theme === 'dark' }/>
                </div>
              </header>
            </>
          )
        } }/>
    )
  }
}

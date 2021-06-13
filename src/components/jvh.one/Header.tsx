import * as React from 'react';
// eslint-disable-next-line import/no-unresolved
import { LinkGetProps } from 'reach__router';
import { Helmet } from 'react-helmet';
import { graphql, Link, StaticQuery } from 'gatsby';
import Toggle from './Toggle';
import './Header.scss';

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
    super(props);
    this.state = { theme: '' };
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  componentDidMount(): void {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    this.setState({ theme: window.__theme });
    // @ts-ignore
    // eslint-disable-next-line no-undef
    window.__onThemeChange = () => {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      this.setState({ theme: window.__theme });
    };
  }

  handleThemeChange(): void {
    const { theme } = this.state;
    // @ts-ignore
    // eslint-disable-next-line no-undef
    window.__setPreferredTheme(
      theme === 'dark' ? 'light' : 'dark'
    );
  }

  render(): React.ReactNode {
    const { theme } = this.state;
    return (
      <StaticQuery
        query={query}
        render={(data) => {
          const { siteMetadata } = data.site;
          const isHome = (props: LinkGetProps): boolean => props.isCurrent;
          return (
            <>
              <Helmet meta={[{
                name: 'theme-color',
                content: theme
              }]}
              />
              <header className="header header__container">
                {
                  !isHome && (
                    <div className="header header__left">
                      <Link to="/" getProps={isHome}>
                        {' '}
                        &larr;
                        {siteMetadata.title}
                      </Link>
                    </div>
                  )
                }

                <div className="header header__right">
                  <Toggle handleClick={this.handleThemeChange} dark={this.state.theme === 'dark'} />
                </div>
              </header>
            </>
          );
        }}
      />
    );
  }
}

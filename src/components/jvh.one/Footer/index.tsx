import React, { ComponentPropsWithRef, ReactElement } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import classnames from 'classnames';
import createSocialUrl from '../../../utils/socialUrl';
import * as style from './style.module.scss';

export const query = graphql`
    query GetSiteFooterMetadata {
        site {
            me: siteMetadata {
                referrals {
                    one {
                        id
                        base
                    }
                }
            }
        }
    }
`;

type FooterProps = {
} & ComponentPropsWithRef<'div'>

export default function Footer(props: FooterProps): ReactElement {
  const { site } = useStaticQuery(query);
  return (
    <div className={classnames(style.footer, 'mb4')} {...props}>
      <div className={classnames(style.footer__links, 'mb8')}>
        <span>Affiliates:</span>
        <a href={createSocialUrl(site.me.referrals.one)}>
          14 euro korting op een .one domein
        </a>
      </div>
    </div>
  );
}

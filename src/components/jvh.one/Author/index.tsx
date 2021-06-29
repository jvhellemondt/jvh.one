import React, { ComponentPropsWithRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import classnames from 'classnames';
import GatsbyImage from 'gatsby-image';
import * as style from './style.module.scss';
import createSocialUrl from '../../../utils/socialUrl';

export const query = graphql`
    query GetSiteAuthorMetadata {
        site {
            me: siteMetadata {
                author
                title
                description
                social {
                    twitter {
                        id
                        base
                    }
                    github {
                        id
                        base
                    }
                }
            }
        }
        image: imageSharp(fluid: {originalName: {eq: "author.png"}}) {
            fluid(maxWidth: 150, maxHeight: 150, fit: CONTAIN) {
                ...GatsbyImageSharpFluid
            }
        }
    }
`;

type AuthorProps = ComponentPropsWithRef<'div'>

export default function Author(props: AuthorProps): React.ReactElement {
  const {
    site,
    image
  } = useStaticQuery(query);

  return (
    <div className={style.author} {...props}>
      <div className={style.author__imageWrapper}>
        <div className={style.circle1} />
        <div className={style.circle2} />
        <GatsbyImage
          alt="Picture of author, Jens van Hellemondt"
          fluid={image.fluid}
          className={style.image}
        />
      </div>

      <h1 className={classnames(style.author__siteTitle)}>
        {site.me.author}
      </h1>

      <div className={classnames('small', 'mb4')}>
        {site.me.social.twitter.id}
      </div>

      <p className={style.author__intro}>
        {site.me.description}
      </p>

      <p className={style.author__links}>
        <a href={createSocialUrl(site.me.social.twitter)}>Volgen op Twitter</a>
        <a href={createSocialUrl(site.me.social.github)}>GitHub repository</a>
      </p>
    </div>
  );
}

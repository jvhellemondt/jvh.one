import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

const query = graphql`
    query GetSiteMetadataSEO {
        site {
            siteMetadata {
                title
                author
                description
                siteUrl
                social {
                    twitter {
                        id
                    }
                }
            }
        }
    }
`;

interface IProps {
  description?: string
  image?: string
  lang?: string
  slug?: string
  meta: Array<{ name: string; content: string }>
  title: string
}

export default function Index(props: IProps): ReactElement {
  const data = useStaticQuery(query);
  const {
    meta,
    image,
    title,
    description,
    slug,
    lang = 'nl'
  } = props;
  const { siteMetadata } = data.site;
  const metaDescription = description || siteMetadata.description;
  const metaImage = image ? `${siteMetadata.siteUrl}/${image}` : null;
  const url = `${siteMetadata.siteUrl}${slug}`;
  return (
    <Helmet
      htmlAttributes={{ lang }}
      {...(title
        ? {
          titleTemplate: `%s — ${siteMetadata.title}`,
          title,
        }
        : { title: `${siteMetadata.title} — blog van Jens van Hellemondt`, })}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:url',
          content: url,
        },
        {
          property: 'og:title',
          content: title || siteMetadata.title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: siteMetadata.social.twitter.id,
        },
        {
          name: 'twitter:title',
          content: title || siteMetadata.title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ]
        .concat(metaImage
          ? [{
            property: 'og:image',
            content: metaImage,
          },
          {
            name: 'twitter:image',
            content: metaImage,
          },]
          : [])
        .concat(meta)}
    />
  );
}

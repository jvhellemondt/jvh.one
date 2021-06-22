import React, { ReactElement } from 'react';
import { graphql, navigate } from 'gatsby';
import Layout from '../layouts';
import { Maybe, Query } from '../../graphql-types';

import {
  PostCard,
  PostCardContainer,
  PostCardContent,
  PostCardCoverImage,
  PostCardHeader,
  PostCardMeta,
  PostCardTags,
  PostCardTitle
} from '../components/jvh.one/PostCard';

export default function HomePage({ data }: { data: Query }): ReactElement {
  const { nodes } = data.allMarkdownRemark;

  const goToPost = (slug: Maybe<string> | undefined) => () => navigate(slug || '/');

  return (
    <Layout title="Home">
      {nodes.map((post) => {
        const title = post.frontmatter?.title || '';
        const tags = post.frontmatter?.tags || [''];
        const date = post.frontmatter?.date || '';
        const timeToRead = post.timeToRead || 0;
        const published = post.frontmatter?.published || false;
        const description = post.frontmatter?.description || '';
        const image = post.frontmatter?.cover_image;
        const fluid = image?.childImageSharp?.fluid;
        const slug = post.fields?.slug;
        return (
          <PostCardContainer key={title}>
            <PostCard tabIndex={0} onKeyPress={goToPost(slug)} onClick={goToPost(slug)}>
              <PostCardHeader>
                {image && fluid && (
                  <PostCardCoverImage
                    alt={image?.name}
                    fluid={fluid}
                  />
                )}
              </PostCardHeader>
              <PostCardTitle>{title}</PostCardTitle>
              <PostCardContent>{description}</PostCardContent>
              <PostCardMeta published={published} date={date} timeToRead={timeToRead} />
              <PostCardTags post={title} tags={tags} />
            </PostCard>
          </PostCardContainer>
        );
      })}
    </Layout>
  );
}

export const query = graphql`
    query HomePageQuery {
        site {
            siteMetadata {
                description
            }
        }
        allMarkdownRemark(
            filter: {frontmatter: {published: {eq: true}}},
            sort: {fields: frontmatter___date, order: DESC}
        ) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    published
                    author
                    cover_credit
                    date(fromNow: true, formatString: "LL", locale: "nl_NL")
                    description
                    cover_image {
                        name
                        childImageSharp {
                            fluid(maxWidth: 1080, maxHeight: 400, fit: COVER) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                    title
                    tags

                }
                excerpt
                id
                timeToRead
            }
        }
    }
`;

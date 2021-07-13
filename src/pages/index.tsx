import React, { ReactElement } from 'react';
import { graphql, navigate } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
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
} from '../components/base/PostCard';

export default function HomePage({ data }: { data: Query }): ReactElement {
  const { nodes } = data.allMarkdownRemark;

  const goToPost = (slug: Maybe<string> | undefined) => () => navigate(slug || '/');

  return (
    <Layout subtitle="Home" withAuthor="top">
      {nodes.map((post) => {
        const title = post.frontmatter?.title || '';
        const tags = post.frontmatter?.tags || [''];
        const date = post.frontmatter?.date || '';
        const timeToRead = post.timeToRead || 0;
        const published = post.frontmatter?.published || false;
        const description = post.frontmatter?.description || '';
        const image = post.frontmatter?.cover_image;
        const gatsbyImageData = image?.childImageSharp?.gatsbyImageData;
        const slug = post.fields?.slug;
        return (
          <PostCardContainer key={title}>
            <PostCard tabIndex={0} onKeyPress={goToPost(slug)} onClick={goToPost(slug)}>
              {image && gatsbyImageData && (
                <PostCardHeader>
                  <PostCardCoverImage
                    alt={image?.name}
                    image={gatsbyImageData as IGatsbyImageData}
                    objectFit="cover"
                  />
                </PostCardHeader>
              )}
              <PostCardTitle>{title}</PostCardTitle>
              <PostCardContent>{description}</PostCardContent>
              <PostCardMeta published={published} date={date} timeToRead={timeToRead} />
              <PostCardTags postTitle={title} tags={tags} />
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
                            gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 2.5)
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

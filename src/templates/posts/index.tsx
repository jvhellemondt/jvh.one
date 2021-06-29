import React, { ReactElement } from 'react';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { MarkdownRemark } from '../../../graphql-types';
import Layout from '../../layouts';

import * as style from './style.module.scss';
import {
  PostCard,
  PostCardContainer,
  PostCardCoverImage,
  PostCardHeader,
  PostCardMeta,
  PostCardTags
} from '../../components/base/PostCard';
import { Tweet } from '../../components/react-tweet-embed';
import useTheme from '../../hooks/useTheme';

export type PostQuery = {
  data: { markdownRemark: MarkdownRemark }
}

export default function Post({ data }: PostQuery): ReactElement {
  const post = data.markdownRemark;
  const date = post.frontmatter?.date || '';
  const title = post.frontmatter?.title || '';
  const tags = post.frontmatter?.tags || [''];
  const twitter = post.frontmatter?.tweet;
  const published = post.frontmatter?.published || false;
  const image = post.frontmatter?.cover_image;
  const fluid = image?.childImageSharp?.fluid;

  const [theme] = useTheme();

  return (
    <Layout subtitle={post.frontmatter?.title} withAuthor="bottom">
      <div>
        <h1 className={style.postTitle}>
          {post?.frontmatter?.title}
        </h1>

        <PostCardMeta published={published} date={date} />
      </div>

      <PostCardContainer>
        <PostCard>
          {image && fluid && (
            <PostCardHeader>
              <PostCardCoverImage
                alt={image?.name}
                fluid={fluid as FluidObject}
              />
            </PostCardHeader>
          )}

          {/* eslint-disable-next-line react/no-danger */}
          <div
            className={style.post__content}
            dangerouslySetInnerHTML={{ __html: `${post.html}` }}
          />

          {
            twitter
            && <Tweet id={twitter} widgetClass={style.twitterWidget} options={{ theme }} />
          }

          <div className="post__footer">
            <PostCardTags postTitle={title} tags={tags} />
          </div>
        </PostCard>
      </PostCardContainer>
    </Layout>
  );
}
export const query = graphql`
    query BlogQuery($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                date
                author
                description
                published
                tags
                tweet
                cover_image {
                    name
                    childImageSharp {
                        fluid(maxWidth: 1080, maxHeight: 400, fit: COVER) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            timeToRead
        }
    }
`;

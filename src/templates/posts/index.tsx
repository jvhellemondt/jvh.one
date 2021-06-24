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

          <div>{`https://twitter.com/jvhellemondt/status/${twitter}`}</div>

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

/*
    <div className="post__content">
      <VueRemarkContent/>
    </div>

    <div className="post__content" style="margin-top: 16px">
      <div style="margin-bottom: 16px">
        <span style="padding-right: 12px">Was dit leerzaam voor jou? Help mij dan het schrijven voort te zetten!</span>
        <KofiButton uid="M4M3414BK" text="Trakteer mij op een kop koffie" color="#bf792a"/>
      </div>
      <div style="margin-bottom: 16px">
        Mocht je vragen hebben, dan mag je die mij natuurlijk stellen! Je kunt ze stellen door een e-mail te sturen
        naar
        <a href="mailto:me@jvh.one">me@jvh.one</a>
        <span v-if="$page.post.tweet"> of door te reageren op deze Tweet:</span>
      </div>
      <Tweet v-if="$page.post.tweet"
             :id="$page.post.tweet"
             :options="{ hideTread: false, hideMedia: false, align: 'center', omitScript: true }"
             style="margin-bottom: 16px"/>
    </div>

    <div className="post__footer">
      <PostTags :post="$page.post"/>
      <PostDirectEdit :post="$page.post"/>
    </div>
  </div>
 */

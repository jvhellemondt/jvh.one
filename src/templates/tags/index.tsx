import React, { ReactElement } from 'react';
import { graphql, navigate } from 'gatsby';
import { PageContext } from 'gatsby/dist/gatsby/src/query/types';
import {
  PostCard,
  PostCardContainer,
  PostCardContent,
  PostCardMeta, PostCardTags,
  PostCardTitle
} from '../../components/base/PostCard';
import Layout from '../../layouts';
import { Maybe, Query } from '../../../graphql-types';

type TagsProps = {
  data: Query, pageContext: PageContext
}

export default function Tags({
  data,
  pageContext: { tag }
}: TagsProps): ReactElement {
  const { edges } = data.allMarkdownRemark;

  const goToPost = (slug: Maybe<string> | undefined) => () => navigate(slug || '/');

  return (
    <Layout subtitle={`# ${tag}`}>
      <h1 className="text-center mb5">{`# ${tag}`}</h1>
      {edges.map(({ node: post }) => {
        const title = post.frontmatter?.title || '';
        const date = post.frontmatter?.date || '';
        const tags = post.frontmatter?.tags || [''];
        const timeToRead = post.timeToRead || 0;
        const published = post.frontmatter?.published || false;
        const description = post.frontmatter?.description || '';
        const slug = post.fields?.slug;
        return (
          <PostCardContainer key={title}>
            <PostCard tabIndex={0} onKeyPress={goToPost(slug)} onClick={goToPost(slug)}>
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
      query TagsQuery($tag: String, $limit: Int = 25) {
          allMarkdownRemark(
              limit: $limit
              sort: { fields: [frontmatter___date], order: DESC }
              filter: { frontmatter: { tags: { in: [$tag] }, published: {eq: true} } }
          ) {
              totalCount
              edges {
                  node {
                      fields {
                          slug
                      }
                      frontmatter {
                          published
                          author
                          date(fromNow: true, formatString: "LL", locale: "nl_NL")
                          description
                          title
                          tags
                      }
                      excerpt
                      id
                      timeToRead
                  }
              }
          }
      }
  `;

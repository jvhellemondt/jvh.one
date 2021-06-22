import React, { ReactElement } from 'react';
import { graphql, Link } from 'gatsby';
import { MarkdownRemark } from '../../graphql-types';
import Layout from '../layouts';

export type PostQuery = {
  data:{ markdownRemark: MarkdownRemark}
}

export default function Post({ data }: PostQuery): ReactElement {
  const post = data.markdownRemark;

  return (
    <Layout subtitle={post.frontmatter?.title}>
      <h1>{post?.frontmatter?.title}</h1>
      <small>{post?.frontmatter?.date}</small>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: `${post.html}` }} />
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
            }
        }
    }
`;

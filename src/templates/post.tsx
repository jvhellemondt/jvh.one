import React, { ReactElement } from 'react';
import { graphql, Link } from 'gatsby';
import { MarkdownRemark } from '../../graphql-types';
import Header from '../components/jvh.one/Header/header';

export type PostQuery = {
  data:{ markdownRemark: MarkdownRemark}
}

export default function Post({ data }: PostQuery): ReactElement {
  const post = data.markdownRemark;

  return (
    <div>
      <Header />
      <h1>{post?.frontmatter?.title}</h1>
      <small>{post?.frontmatter?.date}</small>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: `${post.html}` }} />
    </div>
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

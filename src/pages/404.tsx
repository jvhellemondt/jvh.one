import React, { ReactElement } from 'react';
import { graphql, navigate } from 'gatsby';
import {
  PostCard,
  PostCardContainer,
  PostCardContent,
  PostCardMeta,
  PostCardTags,
  PostCardTitle
} from '../components/base/PostCard';
import Layout from '../layouts';
import { Maybe, Query } from '../../graphql-types';
import * as style from './pages.module.scss';
import Dropdown from '../components/base/Dropdown/Dropdown';

type NotFoundProps = { data: Query }

const NotFoundPage = ({ data }: NotFoundProps): ReactElement => {
  const {
    edges,
    distinct: allTags
  } = data.allMarkdownRemark;

  const goToPost = (slug: Maybe<string> | undefined) => () => navigate(slug || '/');
  const handleTagSelect = (tag: string) => {
    console.log({ tag });
  };

  return (
    <Layout subtitle="Pagina niet gevonden..">
      <div className={style.info}>
        <p className="text-center full-width">Pagina niet gevonden.. </p>
        <p>Ga terug naar de homepage, of klik op een artikel hieronder.</p>
      </div>
      {edges.map(({ node: post }) => {
        const title = post.frontmatter?.title || '';
        const excerpt = post.excerpt || '';
        const tags = post.frontmatter?.tags || [''];
        const date = post.frontmatter?.date || '';
        const timeToRead = post.timeToRead || 0;
        const published = post.frontmatter?.published || false;
        const description = post.frontmatter?.description || '';
        const slug = post.fields?.slug;
        return (
          <PostCardContainer key={slug}>
            <PostCard tabIndex={0} onKeyPress={goToPost(slug)} onClick={goToPost(slug)}>
              <PostCardTitle>{title}</PostCardTitle>
              <PostCardContent>{description || excerpt}</PostCardContent>
              <PostCardMeta published={published} date={date} timeToRead={timeToRead} />
              <PostCardTags postTitle={title} tags={tags} />
            </PostCard>
          </PostCardContainer>
        );
      })}
    </Layout>
  );
};

export default NotFoundPage;

export const query = graphql`
    query LatestPosts {
        allMarkdownRemark(
            limit: 3
            sort: {fields: frontmatter___date, order: DESC}
            filter: {frontmatter: {published: {eq: true}}}
        ) {
            totalCount
            distinct(field: frontmatter___tags)
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

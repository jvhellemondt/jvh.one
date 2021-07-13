import React, { ComponentPropsWithRef } from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash.kebabcase';
import { GatsbyImage, GatsbyImageProps } from 'gatsby-plugin-image';

import * as style from './style.module.scss';
import { Maybe } from '../../../../graphql-types';

export type PostCardProps = ComponentPropsWithRef<'div'>

export const PostCard = (props: PostCardProps): React.ReactElement => {
  const {
    className,
    onClick
  } = props;
  const hasClickEvent = typeof onClick === 'function';
  const classnames = [
    style.postCard,
    !!className && className,
    hasClickEvent && 'pointer'
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classnames} {...props} />
  );
};

export type PostCardHeaderProps = ComponentPropsWithRef<'div'>

export const PostCardHeader = (props: PostCardHeaderProps): React.ReactElement => (
  <div className={style.postCard__header} {...props} />
);

export type PostCardCoverImageProps = GatsbyImageProps

export const PostCardCoverImage = (props: PostCardCoverImageProps): React.ReactElement => (
  <GatsbyImage className={style.postCard__image} {...props} />
);

export type PostCardCreditProps = ComponentPropsWithRef<'div'>

export const PostCardCredit = (props: PostCardCreditProps): React.ReactElement => (
  <div className={style.postCard__credit_wrap}>
    <span className={style.postCard__credit} {...props} />
  </div>
);

export type PostCardContainerProps = ComponentPropsWithRef<'div'>

export const PostCardContainer = (props: PostCardContainerProps): React.ReactElement => (
  <div className={style.postCard__container} {...props} />
);

export type PostCardTitleProps = ComponentPropsWithRef<'h2'>

export const PostCardTitle = ({
  children,
  ...props
}: PostCardTitleProps): React.ReactElement => (
  <h2 className={style.postCard__title} {...props}>{children}</h2>
);

export type PostCardContentProps = ComponentPropsWithRef<'p'>

export const PostCardContent = (props: PostCardContentProps): React.ReactElement => (
  <p className={style.postCard__content} {...props} />
);

export type PostCardMetaProps = ComponentPropsWithRef<'div'>
& {
  published: string | boolean;
  date: string;
  timeToRead?: string | number
}

export const PostCardMeta = (props: PostCardMetaProps): React.ReactElement => {
  const {
    timeToRead,
    published,
    date
  } = props;
  return (
    <div className={style.postCardMeta}>
      <div className={style.postCardMeta__left}>
        {published && (<span>{`Gepubliceerd op ${date}`}</span>)}
        {!published && (<span>{`Verwachte publicatie datum ${date}`}</span>)}
      </div>
      {timeToRead && (
        <div className={style.postCardMeta__right}>
          <strong>{`${timeToRead} minuten lezen`}</strong>
        </div>
      )}
    </div>
  );
};

export type PostCardTagProps = {
  tags: Maybe<Maybe<string>[]>,
  postTitle: Maybe<string>
}

export type PostCardTagsProps = ComponentPropsWithRef<'div'>
& PostCardTagProps

export const PostCardTags = (props: PostCardTagsProps): React.ReactElement => {
  const {
    tags,
    postTitle
  } = props;
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      role="list"
      onClick={(e) => e.stopPropagation()}
      onKeyPress={(e) => e.stopPropagation()}
      className={style.postCardTags}
    >
      {tags && tags.map((tag) => tag && (
        <Link
          key={`${postTitle}-${tag}`}
          to={`/tags/${kebabCase(tag)}`}
          className={style.postCardTags__link}
        >
          {`# ${tag}`}
        </Link>
      ))}
    </div>
  );
};

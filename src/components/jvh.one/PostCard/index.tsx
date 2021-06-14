import React, { ComponentPropsWithRef } from 'react';

import { GatsbyImage, GatsbyImageProps } from 'gatsby-plugin-image';
import * as style from './style.module.scss';

export type PostCardProps = ComponentPropsWithRef<'div'>

export const PostCard = (props: PostCardProps): React.ReactElement => (
  <div className={style.postCard} {...props} />
);

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

export const PostCardTitle = (props: PostCardTitleProps): React.ReactElement => (
  <h2 className={style.postCard__title} {...props} />
);

export type PostCardContentProps = ComponentPropsWithRef<'p'>

export const PostCardContent = (props: PostCardContentProps): React.ReactElement => (
  <p className={style.postCard__content} {...props} />
);

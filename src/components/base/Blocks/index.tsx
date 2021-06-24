import React, { ComponentPropsWithRef, ReactElement, ReactNode } from 'react';
import * as style from './style.module.scss';

export const Main = (props: ComponentPropsWithRef<'main'>): ReactElement => {
  const { className } = props;
  const classNames = [style.main, className].filter(Boolean);
  return (
    <main {...props} className={classNames.join(' ')} />
  );
};

export const Container = (props: ComponentPropsWithRef<'div'>): ReactElement => {
  const { className } = props;
  const classNames = [style.container, className].filter(Boolean);
  return (
    <div {...props} className={classNames.join(' ')} />
  );
};

export const Section = (props: React.ComponentPropsWithRef<'section'>): ReactElement => {
  const { className } = props;
  const classNames = [style.section, className].filter(Boolean);
  return (
    <section {...props} className={classNames.join(' ')} />
  );
};

export const Block = (props: { children: ReactNode }): ReactElement => (
  <Section>
    <Container {...props} />
  </Section>
);

export const Content = (props: { children: ReactNode }): ReactElement => (
  <Section>
    <Container className={style.content} {...props} />
  </Section>
);

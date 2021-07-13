import React, { useEffect, useRef, useState } from 'react';
import useTwitterAPI, { useTwitterAPIProps } from '../useTwitterAPI';

type TweetProps = {
  errorMessageClass?: string;
  widgetClass?: string;
  options?: any;
} & useTwitterAPIProps;

const Tweet = (props: TweetProps) => {
  const [tweetLoaded, setTweetLoaded] = useState(false);
  const [_theme, _setTheme] = useState(null);
  const target = useRef(null);
  const { current } = target;

  const {
    id,
    sourceType,
    slug,
    options: { theme },
    errorMessageClass,
    widgetClass
  } = props;
  const errorMessage = 'Whoops! We couldn\'t access this Tweet!';

  const {
    isLoaded, isAvailable, twitterAPI, params
  } = useTwitterAPI({ id, sourceType, slug });

  useEffect(() => {
    if (isLoaded && isAvailable && twitterAPI && current && !tweetLoaded) {
      twitterAPI.widgets.createTweetEmbed(params, target.current, { theme });
      setTweetLoaded(true);
      _setTheme(theme);
    }
  }, [isLoaded, isAvailable, twitterAPI, current, tweetLoaded]);

  useEffect(() => {
    if (_theme !== theme) {
      // @ts-ignore
      if (target.current) target.current.innerHTML = '';
      setTweetLoaded(false);
      _setTheme(theme);
    }
  }, [theme, _theme]);

  if (isLoaded && !isAvailable) {
    return <div className={errorMessageClass}>{errorMessage}</div>;
  }
  return <div ref={target} className={widgetClass} />;
};

export default Tweet;

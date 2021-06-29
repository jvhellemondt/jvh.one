import React, { useRef } from 'react';
import useTwitterAPI, { useTwitterAPIProps } from '../useTwitterAPI';

type TweetProps = {
  errorMessageClass?: string;
  widgetClass?: string;
} & useTwitterAPIProps;

const Tweet = (props: TweetProps) => {
  const target = useRef(null);

  const {
    id, sourceType, slug, options, errorMessageClass, widgetClass
  } = props;
  const errorMessage = 'Whoops! We couldn\'t access this Tweet!';

  const {
    isLoaded, isAvailable, twitterAPI, params
  } = useTwitterAPI({
    id, sourceType, slug, options
  });

  if (isLoaded && isAvailable) {
    if (twitterAPI) twitterAPI.widgets.createTweetEmbed(params, target.current, options);
  }
  if (isLoaded && !isAvailable) {
    return <div className={errorMessageClass}>{errorMessage}</div>;
  }
  return <div ref={target} className={widgetClass} />;
};

export default Tweet;

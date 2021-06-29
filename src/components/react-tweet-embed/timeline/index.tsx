import React, { useRef } from 'react';
import useTwitterAPI, { useTwitterAPIProps } from '../useTwitterAPI';

type TimelineProps = {
  errorMessageClass?: string;
  widgetClass?: string;
} & useTwitterAPIProps;

const Timeline = (props: TimelineProps) => {
  const target = useRef(null);

  const {
    id, sourceType, slug, options, errorMessageClass, widgetClass
  } = props;
  const errorMessage = 'Whoops! We couldn\'t access this Timeline!';

  const {
    isLoaded, isAvailable, twitterAPI, params
  } = useTwitterAPI({
    id, sourceType, slug, options
  });

  if (isLoaded && isAvailable) {
    if (twitterAPI) twitterAPI.widgets.createTimeline(params, target.current, options);
  }
  if (isLoaded && !isAvailable) {
    return <div className={errorMessageClass}>{errorMessage}</div>;
  }
  return <div ref={target} className={widgetClass} />;
};

export default Timeline;

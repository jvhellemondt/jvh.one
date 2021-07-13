import React, { useEffect, useRef, useState } from 'react';
import useTwitterAPI, { useTwitterAPIProps } from '../useTwitterAPI';

type TimelineProps = {
  errorMessageClass?: string;
  widgetClass?: string;
  options?: any;
} & useTwitterAPIProps;

const Timeline = (props: TimelineProps) => {
  const [timelineLoaded, setTimelineLoaded] = useState(false);
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
  const errorMessage = 'Whoops! We couldn\'t access this Timeline!';

  const {
    isLoaded, isAvailable, twitterAPI, params
  } = useTwitterAPI({ id, sourceType, slug });

  useEffect(() => {
    if (isLoaded && isAvailable && twitterAPI && current && !timelineLoaded) {
      twitterAPI.widgets.createTimeline(params, target.current, { theme });
      setTimelineLoaded(true);
      _setTheme(theme);
    }
  }, [isLoaded, isAvailable, twitterAPI, current, timelineLoaded]);

  useEffect(() => {
    if (_theme !== theme) {
      // @ts-ignore
      if (target.current) target.current.innerHTML = '';
      setTimelineLoaded(false);
      _setTheme(theme);
    }
  }, [theme, _theme]);

  if (isLoaded && !isAvailable) {
    return <div className={errorMessageClass}>{errorMessage}</div>;
  }
  return <div ref={target} className={widgetClass} />;
};

export default Timeline;

import React, { useEffect, useRef, useState } from 'react';
import useTwitterAPI, { useTwitterAPIProps } from '../useTwitterAPI';

type MomentProps = {
  errorMessageClass?: string;
  widgetClass?: string;
  options?: any;
} & useTwitterAPIProps;

const Moment = (props: MomentProps) => {
  const [momentLoaded, setMomentLoaded] = useState(false);
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
  const errorMessage = 'Whoops! We couldn\'t access this Moment!';

  const {
    isLoaded, isAvailable, twitterAPI, params
  } = useTwitterAPI({ id, sourceType, slug });

  useEffect(() => {
    if (isLoaded && isAvailable && twitterAPI && current && !momentLoaded) {
      twitterAPI.widgets.createMoment(params, target.current, { theme });
      setMomentLoaded(true);
      _setTheme(theme);
    }
  }, [isLoaded, isAvailable, twitterAPI, current, momentLoaded]);

  useEffect(() => {
    if (_theme !== theme) {
      // @ts-ignore
      if (target.current) target.current.innerHTML = '';
      setMomentLoaded(false);
      _setTheme(theme);
    }
  }, [theme, _theme]);

  if (isLoaded && !isAvailable) {
    return <div className={errorMessageClass}>{errorMessage}</div>;
  }
  return <div ref={target} className={widgetClass} />;
};

export default Moment;

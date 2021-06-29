import { useEffect, useState } from 'react';

let addScriptPromise: Promise<void> | null = null;

export const addPlatformScript = (src: string): Promise<void> => {
  if (addScriptPromise) return addScriptPromise;
  const script = document.createElement('script');
  script.setAttribute('src', src);
  document.head.appendChild(script);
  addScriptPromise = new Promise((resolve) => {
    script.onload = () => {
      resolve(window.twttr);
    };
  });
  return addScriptPromise;
};

type twitterParams = {
  sourceType?: string;
  screenName?: string;
  ownerScreenName?: string;
  slug?: string;
} | string | null

type useTwitterAPIReturn = {
  isLoaded: boolean;
  isAvailable: boolean;
  twitterAPI: any;
  params: twitterParams
}

export type useTwitterAPIProps = {
  id: string;
  sourceType?: string;
  slug?: string;
  options?: any;
}

const useTwitterAPI = ({
  id, sourceType, slug, options
}: useTwitterAPIProps): useTwitterAPIReturn => {
  const [twttr, setTwttr] = useState(null);
  const [params, setParams] = useState<twitterParams>(null);
  const [isLoaded, setLoaded] = useState(false);
  const [isAvailable, setAvailable] = useState(false);

  useEffect(() => {
    const connectAPI = async () => {
      switch (sourceType) {
        case 'profile':
          setParams({ sourceType, screenName: id });
          break;
        case 'list':
          setParams({ sourceType, ownerScreenName: id, slug });
          break;
        default:
          setParams(id);
      }

      const TwitterAPI = window.twttr
        || await addPlatformScript('//platform.twitter.com/widgets.js');
      setTwttr(TwitterAPI);
      setAvailable(TwitterAPI !== undefined);
      setLoaded(true);
    };
    connectAPI();
  }, [id, sourceType, slug, options]);

  return {
    isLoaded, isAvailable, twitterAPI: twttr, params
  };
};

export default useTwitterAPI;

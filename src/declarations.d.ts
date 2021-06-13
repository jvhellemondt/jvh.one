declare module '*.scss' {
  interface ClassNames {
    [className: string]: string;
  }

  const classNames: ClassNames;
  export = classNames;
}

declare module '*.svg' {
  import { ReactHTMLElement, ReactSVGElement } from 'react';

  const content: ReactHTMLElement<ReactSVGElement>;
  export default content;
}

declare module '*.png' {
  const value: string;
  export = value;
}

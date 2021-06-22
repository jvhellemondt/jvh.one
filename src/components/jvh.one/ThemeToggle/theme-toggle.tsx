import React, { ReactElement } from 'react';
import classNames from 'classnames';
import FeatherSun from '../../../assets/FeatherSun';
import FeatherMoon from '../../../assets/FeatherMoon';
import * as style from './style.module.scss';

interface IProps {
  dark?: boolean
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function ThemeToggle({
  dark = false,
  handleClick
}: IProps): ReactElement {
  return (
    <button
      type="button"
      aria-label="Toggle dark/light mode"
      onClick={handleClick}
      className={classNames(style.toggleTheme, dark && style.toggleThemeDark)}
    >
      {dark ? <FeatherMoon /> : <FeatherSun />}
    </button>
  );
}

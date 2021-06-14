import React from 'react';
import FeatherSun from '../../../assets/FeatherSun';
import FeatherMoon from '../../../assets/FeatherMoon';
import * as style from './style.module.scss';

interface IProps {
  dark?: boolean
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default ({
  dark = false,
  handleClick
}: IProps) => (
  <button
    type="button"
    aria-label="Toggle dark/light mode"
    onClick={handleClick}
    className={[style.toggleTheme, ...(dark ? [style.toggleThemeDark] : [])].join(' ')}
  >
    {dark ? <FeatherMoon /> : <FeatherSun />}
  </button>
);

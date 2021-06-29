import React, { ReactElement } from 'react';
import classNames from 'classnames';
import FeatherSun from '../../../assets/vectors/FeatherSun.svg';
import FeatherMoon from '../../../assets/vectors/FeatherMoon.svg';
import * as style from './style.module.scss';

interface IProps {
  dark?: boolean
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ThemeToggle = ({
  dark = false,
  handleClick
}: IProps): ReactElement => (
  <button
    type="button"
    aria-label="Toggle dark/light mode"
    onClick={handleClick}
    className={classNames(style.toggleTheme, dark && style.toggleThemeDark)}
  >
    {
      dark
        ? <FeatherMoon />
        : <FeatherSun />
    }
  </button>
);

export default ThemeToggle;

import React from 'react';
import classnames from 'classnames';

import CaretUp from '../../../assets/vectors/CaretUp.svg';
import CaretDown from '../../../assets/vectors/CaretDown.svg';
import CaretLeft from '../../../assets/vectors/CaretLeft.svg';
import CaretRight from '../../../assets/vectors/CaretRight.svg';

import * as style from './icon.module.scss';

const iconMap = {
  'caret-up': CaretUp,
  'caret-down': CaretDown,
  'caret-left': CaretLeft,
  'caret-right': CaretRight,
};

export type IconName = keyof typeof iconMap;

export type IconProps = {
  name: IconName;
  svgClass?: any;
}

const Icon = ({ svgClass = '', ...props }: IconProps) => {
  const Component = iconMap[props.name];
  return (<Component className={classnames(style.icon, { [svgClass]: svgClass })} />);
};
export default Icon;

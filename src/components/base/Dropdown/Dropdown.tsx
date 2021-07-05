import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Icon from '../Icon/Icon';

import * as style from './dropdown.module.scss';

export type DropdownItemProps = {
  id: string;
  label: string;
}

export type DropdownProps = {
  placeholder?: string;
  items: DropdownItemProps[];
  onSelect?: (selectedItem: string) => void;
}

const Dropdown = (props: DropdownProps) => {
  const { items, placeholder } = props;
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('');

  const hasItems = items.length > 0;

  const toggleDropdown = () => hasItems && setOpen(!isOpen);
  const closeDropdown = () => setOpen(false);

  const handleItemClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedItem !== e.target?.id) toggleDropdown();
    return setSelectedItem(e.target?.id);
  };

  useEffect(() => {
    if (props.onSelect) props.onSelect(selectedItem);
  }, [selectedItem]);

  return (
    <button
      type="button"
      className={classnames(
        style.dropdown,
        { [style.disabled]: !hasItems },
        { [style.open]: isOpen }
      )}
      onClick={toggleDropdown}
      tabIndex={0}
      onBlur={closeDropdown}
    >
      <div className={style.dropdownHeader}>
        <span className={style.selection}>
          {items.find((item) => item.id === selectedItem)?.label || placeholder}
        </span>
        <span className={style.icon}>
          <Icon
            name="caret-down"
            svgClass={classnames(
              style.icon,
              { [style.open]: isOpen },
              { [style.disabled]: !hasItems }
            )}
          />
        </span>
      </div>
      <div className={style.dropdownBody}>
        {hasItems && items.map((item) => (
          <div
            role="button"
            key={item.id}
            className={style.dropdownItem}
            onClick={handleItemClick}
            id={`${item.id}`}
          >
            <span
              className={classnames(style.dropdownItemDot,
                { [style.selected]: item.id === selectedItem })}
            >
              •
              {' '}
            </span>
            {item.label}
          </div>
        ))}
      </div>
    </button>
  );
};

export default Dropdown;

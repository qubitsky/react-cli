import React from 'react';

import { SearchIcon } from '@anya-ui/icons';

import css from './style.module.less';

interface Props {
  onChange?: any;
}

export default function ProjectFilter({ onChange }: Props) {
  return (
    <div className={css.filter}>
      <div className={css.filter.filter}>
        <SearchIcon />
        <input className={css.input} onChange={onChange} type="text" />
      </div>
    </div>
  );
}

import React from 'react';
import cn from 'classnames';

import { FolderFilledIcon as FolderIcon } from '@anya-ui/icons';

import css from './style.module.less';

interface Props {
  url: string[];
  theme: boolean | null;
}

export default function CurrentPath({ url, theme }: Props) {
  const styles = cn(css.path, {
    [css.dark]: theme,
  });

  return (
    <div className={styles}>
      <div className={css.icon}>
        <FolderIcon />
      </div>
      {url && `/${url.join('/')}`}
    </div>
  );
}

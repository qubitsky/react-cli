import React, { useContext } from 'react';
import cn from 'classnames';

import { SettingsContext } from '@context';
import { AttachFileIcon } from '@anya-ui/icons';

import css from './style.module.less';

interface Props {
  text: string;
}

export default function Empty({ text }: Props) {
  const { darkTheme } = useContext(SettingsContext);

  const styles = cn(css.emptyInfo, {
    [css.dark]: darkTheme,
  });

  return (
    <div className={styles}>
      <AttachFileIcon />
      {text}
    </div>
  );
}

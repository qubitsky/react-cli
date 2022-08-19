import React from 'react';

import { ReactLogoIcon as LoaderIcon } from '@anya-ui/icons';

import css from './style.module.less';

export default function Loader() {
  return (
    <div className={css.loading}>
      <LoaderIcon />
    </div>
  );
}

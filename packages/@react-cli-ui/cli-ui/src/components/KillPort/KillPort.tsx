import React, { useState, useEffect, useContext } from 'react';
import cn from 'classnames';

import { useNotification } from '@hooks';
import { SettingsContext } from '@context';
import { FlashFilledIcon as FlashIcon } from '@anya-ui/icons';

import { Input } from 'common';

import css from './style.module.less';

/** @TODO add locales */
export default function KillPort() {
  const notification = useNotification();
  const { socket, darkTheme } = useContext(SettingsContext);

  // State
  const [value, setValue] = useState('');
  const styles = cn(css.wrapperCard, {
    [css.dark]: darkTheme,
  });

  useEffect(() => {
    socket.on('kill-port', (res: any) => {
      setValue('');
      notification.success({
        title: res.title,
        message: res.message,
      });
    });
    socket.on('kill-erro', (error: any) => {
      notification.error({
        title: error.title,
        message: error.message,
      });
    });
    return () => {
      socket.off('kill-port');
      socket.off('kill-erro');
    };
  }, []);

  function handleKill(ev: any) {
    ev.preventDefault();
    if (!value) return;
    socket.send({
      type: 'KILL_PORT',
      port: value,
    });
  }

  function handleChange(ev: any) {
    setValue(ev.value);
  }

  function handleKeyPress(ev: React.KeyboardEvent) {
    if (ev.charCode === 13) {
      return handleKill(ev);
    }
  }

  return (
    <div className={styles}>
      <div className={css.killPors}>
        <div className={css.title}>Kill Port</div>
        <div className={css.description}>
          <div className={css.descriptionIcon}>
            <FlashIcon />
          </div>
          <span>Ready to kill</span>
        </div>
        <div className={css.content}>
          <Input type="number" value={value} onChange={handleChange} onKeyPress={handleKeyPress} />
          <button onClick={handleKill}>
            <FlashIcon />
            <span>Kill</span>
          </button>
        </div>
      </div>
    </div>
  );
}

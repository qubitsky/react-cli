import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { SettingsContext } from '@context';
import { ComputerIcon } from '@anya-ui/icons';

import css from './style.module.less';

interface ILog {
  id: number;
  date: Date;
  message: string;
  type: string;
  tag?: string;
}

export default function Logs() {
  const { t } = useTranslation('common');
  const { socket } = useContext(SettingsContext);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    socket.send({
      type: 'GET_LOGS',
    });
    socket.on('list-logs', (res: any) => {
      setLogs(res.data);
    });
    return () => {
      socket.off('list-logs');
    };
  }, []);

  return (
    <div className={css.logger}>
      <div className={css.header}>
        <div className={css.icon}>
          <ComputerIcon />
        </div>
        {t('logs')}
      </div>
      <div className={css.content}>
        {logs &&
          logs.map((log: ILog) => {
            return (
              <div className={css.wrapper} key={log.id}>
                <div className={css.type}>{log.type}</div>
                <div className={css.message}>{log.message}</div>
                <div className={css.date}>{log.date}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

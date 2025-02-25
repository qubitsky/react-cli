import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { Routes } from 'router';
import { CurrentPath, Logs } from '@components';
import { SettingsContext } from '@context';

import {
  TranslateIcon,
  DarkModeIcon as DarkIcon,
  LightModeIcon as LightIcon,
  HomeFilledIcon as HomeIcon,
  ComputerIcon,
} from '@anya-ui/icons';

import css from './style.module.less';

export default function Footer() {
  const location = useLocation();
  const [toggle, setToggle] = useState('');
  const [toggleLog, setToggleLog] = useState<boolean>(false);
  const { darkTheme, changeTheme, changeLocale, selectedPath } = useContext(SettingsContext);
  // theme
  const styles = cn(css.footer, {
    [css.dark]: darkTheme,
  });

  useEffect(() => {
    setToggle(location.pathname.replace('/', ''));
  }, [location]);

  function renderThemeIcon() {
    return darkTheme ? <LightIcon onClick={changeTheme} /> : <DarkIcon onClick={changeTheme} />;
  }

  function handleClick() {
    const value = toggle === 'project' ? 'dashboard' : 'project';
    setToggle(value);
  }

  function handleToggleLog() {
    setToggleLog(!toggleLog);
  }

  return (
    <div className={styles}>
      {toggleLog && <Logs />}
      <div className={css.content}>
        <Link
          to={toggle === 'project' ? Routes.DASHBOARD : Routes.PROJECT}
          onClick={handleClick}
          className={css.icon}
        >
          <HomeIcon />
        </Link>
        {selectedPath && <CurrentPath theme={darkTheme} url={selectedPath} />}
        <div className={css.log} onClick={handleToggleLog}>
          <div className={css.iconLog}>
            <ComputerIcon />
          </div>
          🌠 {`Ready on http://localhost: ${process.env.DEV_CLIENT_PORT ?? 8080}`}
        </div>
        <div className={css.rightGroup}>
          <div className={css.icon}>{renderThemeIcon()}</div>
          <div className={css.icon}>
            <TranslateIcon onClick={changeLocale} />
          </div>
        </div>
      </div>
    </div>
  );
}

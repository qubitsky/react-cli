import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { Routes } from 'router';
import {
  NavImportIcon as ImportIcon,
  NavProjectsIcon as ProjectIcon,
  NavSelectFolderIcon as SelectFolderIcon,
} from '@anya-ui/icons';

import logo from '@public/logo192.png';

import useProjectContainer, { TabItem } from './projectContainer.hook';
import css from './style.module.less';

export default function ProjectContainer() {
  const { t } = useTranslation('project');
  const { locale, activeTab, darkTheme } = useProjectContainer();
  const styles = cn(css.wrapperHeader, {
    [css.dark]: darkTheme,
  });

  const tabs: TabItem[] = [
    { key: Routes.PROJECT, label: t('projects'), Icon: ProjectIcon },
    { key: Routes.PROJECT_SELECT, label: t('create'), Icon: SelectFolderIcon },
    { key: Routes.PROJECT_IMPORT, label: t('import'), Icon: ImportIcon },
  ];

  const renderChildren = useMemo(
    () =>
      tabs.map(({ key, label, Icon }: TabItem) => {
        return (
          <NavLink
            key={key}
            exact={true}
            to={key}
            activeClassName={css.active}
            isActive={(_, location) => {
              if (key === Routes.PROJECT_SELECT && Routes.PROJECT_CREATE === location.pathname) {
                return true;
              }

              if (key === location.pathname) {
                return true;
              }
              return false;
            }}
          >
            <Icon />
            {label}
          </NavLink>
        );
      }),
    [activeTab, locale],
  );

  return (
    <header className={styles}>
      <div className={css.wrapperLayout}>
        <div className={css.wrapperLogo}>
          <img src={logo} alt="logo" />
          <span>{t('headerTitle')}</span>
        </div>
        <div className={css.nav}>{renderChildren}</div>
      </div>
    </header>
  );
}

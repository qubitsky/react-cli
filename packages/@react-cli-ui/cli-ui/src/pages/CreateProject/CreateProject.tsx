import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import { ReactLogoIcon as Loader } from '@anya-ui/icons';

import { Content } from '@components';
import { useModal, useNotification } from '@hooks';
import { Input, Select } from 'common';
import { FileManagerModal } from 'modals';
import { SettingsContext } from 'context';
import { Routes } from 'router';

import css from './style.module.less';
import mainCss from '@styles/main.module.less';

const optionsManager = [
  { value: 'npm', label: 'npm' },
  { value: 'yarn', label: 'yarn' },
];

const optionsPreset = [
  { value: 'create-react-app', label: 'create-react-app' },
  { value: 'vue-create', label: 'vue create' },
  // TODO create custorm-react-app
  // { value: 'custom-react-app', label: 'custom-react-app' }
];

export default function CreateProject() {
  const { t } = useTranslation('projectCreate');
  const history = useHistory();
  const notification = useNotification();
  const { socket, selectedPath, darkTheme } = React.useContext(SettingsContext);

  const styles = cn(css.createContainer, {
    [css.dark]: darkTheme,
  });

  // State
  const { visible, showModal, closeModal } = useModal();
  const [logInfo, setLogInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    name: '',
    manager: optionsManager[0],
    preset: optionsPreset[0],
  });

  useEffect(() => {
    socket.on('logging', (msg: any) => {
      setLogInfo(msg.message);
    });
    socket.on('notification', () => {
      setLoading(false);
      history.push(Routes.DASHBOARD);
    });
    socket.on('erro', (error: any) => {
      setLoading(false);
      notification.error({
        title: error.title,
        message: error.message,
      });
    });
    return () => {
      socket.off('logging');
      socket.off('notification');
      socket.off('erro');
    };
  }, []);

  function handleChange({ value, name }: { value: string; name: string }) {
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  function renderAnimatedDots() {
    return new Array(3).fill('.').map((content, i) => (
      <i key={`key-${i}`} className={css[`loadingDot${i + 1}`]}>
        {content}
      </i>
    ));
  }

  function createProject() {
    const { name, manager, preset } = state;
    setLoading(true);
    socket.send({
      type: 'CREATE_PROJECT',
      name,
      path: selectedPath,
      manager: manager.value,
      preset: preset.value,
    });
  }

  if (loading) {
    return (
      <Content>
        <div
          className={cn(css.createContainer, css.loading, {
            [css.dark]: darkTheme,
          })}
        >
          <Loader />
          <span>
            {`${t('creatingProject')} ${state.name}`}
            {renderAnimatedDots()}
          </span>
          <div className={css.loadingDescription}>{logInfo}</div>
        </div>
      </Content>
    );
  }

  return (
    <Content>
      <div className={styles}>
        <h2 className={css.createTitle}>{t('createProjectTitle')}</h2>
        <FileManagerModal
          folderName={state.name}
          visible={visible}
          closeModal={closeModal}
          showModal={showModal}
        />
        <Input
          name="name"
          label={t('nameProject')}
          placeholder={t('typeName')}
          prefix="folder"
          className={css.projectName}
          value={state.name}
          onChange={handleChange}
        />
        <Select
          name="preset"
          label={t('selectPreset')}
          onChange={handleChange}
          options={optionsPreset}
          value={state.preset}
        />
      </div>
      <button className={mainCss.foulderBtn} onClick={createProject}>
        {`+ ${t('createProject')}`}
      </button>
    </Content>
  );
}

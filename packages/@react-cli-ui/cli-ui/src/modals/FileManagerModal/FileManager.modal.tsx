import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { SettingsContext } from 'context';
import { Modal, FileManager } from '@components';

import { EditPenIcon as EditIcon } from '@anya-ui/icons';

import css from './style.module.less';

export interface ModalFolder {
  folderName: string;
  visible?: boolean;
  showModal?(e: React.MouseEvent<HTMLElement>): void;
  closeModal?(e: React.MouseEvent<HTMLElement>): void;
}

function FileManagerModal({ folderName, visible, closeModal, showModal }: ModalFolder) {
  const { t } = useTranslation('modal');
  const { selectedPath, darkTheme } = React.useContext(SettingsContext);

  const styles = cn(css.modal, {
    [css.dark]: darkTheme,
  });

  function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    typeof closeModal === 'function' && closeModal(e);
  }

  return (
    <div className={styles}>
      <label>
        {`/${selectedPath.join('/')}${selectedPath.length && folderName ? '/' : ''}`}
        <strong>{folderName}</strong>
      </label>
      <button onClick={showModal}>
        <EditIcon />
      </button>
      <Modal
        title={t('selectFolder')}
        okText={t('common:select')}
        visible={visible}
        onOk={onSubmit}
        onCancel={closeModal}
      >
        <FileManager />
      </Modal>
    </div>
  );
}

export default React.memo(FileManagerModal);

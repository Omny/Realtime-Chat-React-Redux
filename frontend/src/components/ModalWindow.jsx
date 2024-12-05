import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import { closeModal } from '../slices/modalSlice';
import AddChannelForm from './AddChannelForm';
import RenameChannelForm from './RenameChannelForm';
import RemoveChannelForm from './RemoveChannelForm';

const forms = {
  addChannel: { form: AddChannelForm, title: 'modals.add' },
  renameChannel: { form: RenameChannelForm, title: 'modals.rename' },
  removeChannel: { form: RemoveChannelForm, title: 'modals.remove' },
};

const ModalWindow = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isVisible, modalType } = useSelector((state) => state.modal);
  const ModalForm = forms[modalType]?.form;
  const modalTitle = t(forms[modalType]?.title);

  if (!ModalForm || !isVisible || !modalType) {
    return null;
  }
  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm handleClose={() => dispatch(closeModal())} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;

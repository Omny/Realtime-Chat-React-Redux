import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { setIdToProcess, setModalType, setModalVisibility } from '../slices/modalSlice';
import socketManager from '../socketManager';

const RenameChannelForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectAll);
  const id = useSelector((state) => state.modal.idToProcess);
  const { name } = channels.find((channel) => channel.id === id);

  const handleSubmit = (values, { setSubmitting }) => {
    const handleAfterResponse = (response) => {
      if (response.status === 'ok') {
        toast.success(t('channels.renamed'));
        handleClose();
      }
    };
    const payload = { id, name: values.name };
    socketManager.emit('renameChannel', payload, handleAfterResponse);
    setSubmitting(false);
  };

  const ChannelsSchema = Yup.object().shape({
    name: Yup
      .string()
      .trim()
      .min(3, t('modals.passMin3'))
      .max(20, t('modals.passMax20'))
      .required(t('modals.required'))
      .test('unique', t('modals.uniq'), (value) => !channels.some((channel) => channel.name === value)),
  });

  return (
    <Formik
      initialValues={{ name }}
      onSubmit={handleSubmit}
      validationSchema={ChannelsSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({
        errors, touched, values, isSubmitting,
      }) => (
        <Form noValidate className="py-1">
          <div className="input-group pb-3">
            {t('modals.rename')}
            {' '}
            {name}
            ?
          </div>
          <div className={cn('input-group', { 'has-validation': errors.name && touched.name })}>
            <Field
              type="text"
              name="name"
              id="name"
              value={values.name}
              aria-label={t('modals.editChannelName')}
              placeholder={t('modals.editChannelName')}
              className={cn('mb-4 form-control', { 'is-invalid': (errors.name && touched.name) })}
              data-last-active-input
              autoFocus
            />
            <label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</label>
            <ErrorMessage name="name" component="div" className="invalid-tooltip" />
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <Button type="button" variant="secondary" className="me-2" onClick={handleClose}>{t('modals.cancel')}</Button>
            <Button type="submit" disabled={isSubmitting} variant="primary" default>{t('modals.submit')}</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const RenameChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const input = document.querySelector('[name="name"]');
    if (input) {
      input.focus();
    }
  }, []);

  const handleClose = () => {
    dispatch(setModalVisibility(false));
    dispatch(setIdToProcess(0));
    dispatch(setModalType(null));
  };

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RenameChannelForm handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;

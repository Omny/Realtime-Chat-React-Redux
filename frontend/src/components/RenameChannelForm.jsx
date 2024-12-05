import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { closeModal } from '../slices/modalSlice';
import { useApi } from '../hooks';

const RenameChannelForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const id = useSelector((state) => state.modal.idToUpdate);
  const { name } = channels.find((channel) => channel.id === id);
  const socketApi = useApi();

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    const handleAfterResponse = (response) => {
      if (response.status === 'ok') {
        toast.success(t('channels.renamed'));
        dispatch(closeModal());
      }
    };
    socketApi.emit('renameChannel', { id, name: values.name }, handleAfterResponse);
    setSubmitting(false);
  };

  const ChannelsSchema = Yup.object().shape({
    name: Yup
      .string().trim().min(3, t('modals.passMin3')).max(20, t('modals.passMax20'))
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
              autoComplete="off"
              innerRef={inputRef}
            />
            <label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</label>
            <ErrorMessage name="name" component="div" className="invalid-tooltip" />
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <Button type="button" variant="secondary" className="me-2" onClick={() => dispatch(closeModal())}>{t('modals.cancel')}</Button>
            <Button type="submit" disabled={isSubmitting} variant="primary" default>{t('modals.submit')}</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RenameChannelForm;

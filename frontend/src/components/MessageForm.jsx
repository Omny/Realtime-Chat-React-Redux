import { useSelector } from 'react-redux';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useApi, useAuth } from '../hooks';

const MessageForm = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const auth = useAuth();
  const username = auth.getUsername();
  const socketApi = useApi();

  const MessageSchema = Yup.object().shape({
    body: Yup.string().required(t('messages.required')),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const handleAfterResponse = (response) => {
      if (response.status === 'ok') {
        resetForm();
      }
    };

    const cleanedBody = leoProfanity.clean(values.body);
    socketApi.emit('newMessage', { body: cleanedBody, channelId: currentChannelId, username }, handleAfterResponse);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ body: '' }}
      validationSchema={MessageSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, values, isSubmitting }) => (
        <Form noValidate className="py-1 border rounded-2">
          <div className={cn('input-group', { 'has-validation': !values.body || errors.body || isSubmitting })}>
            <Field
              type="text"
              name="body"
              value={values.body}
              aria-label={t('messages.newMessage')}
              placeholder={t('messages.enter')}
              className="border-0 p-0 ps-2 form-control"
              data-last-active-input
              autoFocus
              autoComplete="off"
            />
            <Button
              type="submit"
              disabled={!values.body || errors.body || isSubmitting}
              variant="primary"
              className="btn-group-vertical"
            >
              <ArrowRightSquare size={20} />
              <span className="visually-hidden">{t('messages.send')}</span>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;

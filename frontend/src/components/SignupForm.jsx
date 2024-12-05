import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks';
import routes from '../routes';

const SignupForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    username: Yup.string().trim().min(3, t('signup.passMin3')).max(20, t('signup.passMax20'))
      .required(t('signup.required')),
    password: Yup.string().trim().min(6, t('signup.passMin6'))
      .required(t('signup.required')),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], t('signup.mustMatch'))
      .required(t('signup.required')),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    const { username, password } = values;
    try {
      const response = await axios.post(routes.signupPath(), { username, password });
      auth.handleLogin(response.data.username, response.data.token);
      navigate(routes.homePagePath());
    } catch (error) {
      if (error.response?.status === 409) {
        setFieldError('username', t('signup.alreadyExists'));
        setSubmitting(false);
      } else if (axios.isAxiosError(error)) {
        toast.error(t('errors.network'));
      } else {
        toast.error(t('errors.unknown'));
      }
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirm: '' }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('signup.title')}</h1>
          <div className="form-floating mb-3">
            <Field
              type="username"
              name="username"
              autoComplete="username"
              required
              placeholder={t('signup.username')}
              id="username"
              className={cn('form-control', { 'is-invalid': (errors.username && touched.username) })}
              data-last-active-input
              autoFocus
            />
            <label className="form-label" htmlFor="username">{t('signup.username')}</label>
            <ErrorMessage name="username" component="div" className="invalid-tooltip" />
          </div>
          <div className="form-floating mb-4">
            <Field
              type="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder={t('signup.password')}
              id="password"
              className={cn('form-control', { 'is-invalid': (errors.password && touched.password) })}
            />
            <label className="form-label" htmlFor="password">{t('signup.password')}</label>
            <ErrorMessage name="password" component="div" className="invalid-tooltip" />
          </div>
          <div className="form-floating mb-4">
            <Field
              type="password"
              name="passwordConfirm"
              autoComplete="current-password"
              required
              placeholder={t('signup.confirm')}
              id="passwordConfirm"
              className={cn('form-control', { 'is-invalid': (errors.passwordConfirm && touched.passwordConfirm) })}
            />
            <label className="form-label" htmlFor="passwordConfirm">{t('signup.confirm')}</label>
            <ErrorMessage name="passwordConfirm" component="div" className="invalid-tooltip" />
          </div>
          <Button type="submit" disabled={isSubmitting} variant="outline-primary" className="w-100 mb-3 btn btn-outline-primary">
            {t('signup.submit')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;

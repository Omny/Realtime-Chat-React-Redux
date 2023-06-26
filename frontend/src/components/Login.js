/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import axios from 'axios';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import AppContext from '../contexts';
import routes from '../routes';
import loginImg from '../images/login.jpg';

const LoginForm = () => {
  const { t } = useTranslation();
  const { handleLogin } = useContext(AppContext);

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('login.required')),
    password: Yup.string()
      .required(t('login.required')),
  });

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        const { username, password } = values;
        try {
          const response = await axios.post(routes.loginPath(), { username, password });
          console.log(response);
          handleLogin(response.data.username, response.data.token);
        } catch (error) {
          console.log(error);
          if (error.response?.status === 401) {
            setFieldError('username', t('login.authFailed'));
            setFieldError('password', t('login.authFailed'));
            setSubmitting(false);
            return;
          }
          if (error.isAxiosError) {
            toast.error(t('errors.network'));
          } else {
            toast.error(t('errors.unknown'));
          }
        }
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('login.login')}</h1>
          <div className="form-floating mb-3">
            <Field
              type="username"
              name="username"
              autoComplete="username"
              required
              placeholder={t('login.username')}
              id="username"
              className={cn('form-control', {
                'is-invalid': (errors.username && touched.username),
              })}
              data-last-active-input
              autoFocus
            />
            <label className="form-label" htmlFor="username">
              {t('login.username')}
            </label>
            <ErrorMessage name="username" component="div" className="invalid-tooltip" />
          </div>
          <div className="form-floating mb-4">
            <Field
              type="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder={t('login.password')}
              id="password"
              className={cn('form-control', {
                'is-invalid': (errors.password && touched.password),
              })}
            />
            <label className="form-label" htmlFor="password">
              {t('login.password')}
            </label>
            <ErrorMessage name="password" component="div" className="invalid-tooltip" />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="outline-primary"
            className="w-100 mb-3 btn btn-outline-primary"
          >
            {t('login.submit')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImg} className="rounded-circle" alt="login" />
              </div>
              <LoginForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.newToChat')}</span>
                {' '}
                <a href="/signup">{t('login.signup')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

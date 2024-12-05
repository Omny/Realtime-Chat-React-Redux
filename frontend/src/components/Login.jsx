import { useTranslation } from 'react-i18next';
import loginImg from '../images/login.jpg';
import LoginForm from './LoginForm';
import routes from '../routes';

const Login = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100 row justify-content-center align-content-center">
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
              <a href={routes.signupPagePath()}>{t('login.signup')}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

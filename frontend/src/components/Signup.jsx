import { useTranslation } from 'react-i18next';
import registrationImg from '../images/registration.jpg';
import SignupForm from './SignupForm';
import routes from '../routes';

const Signup = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100 row justify-content-center align-content-center">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={registrationImg} className="rounded-circle" alt="signup" />
            </div>
            <SignupForm />
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>{t('signup.alreadyHaveAccount')}</span>
              {' '}
              <a href={routes.loginPagePath()}>{t('signup.login')}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

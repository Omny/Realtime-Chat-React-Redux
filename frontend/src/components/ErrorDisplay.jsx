import { useTranslation } from 'react-i18next';
import notFoundImg from '../images/not-found.svg';
import routes from '../routes';

const ErrorDisplay = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('errors.title')} className="img-fluid h-25" src={notFoundImg} />
      <h1 className="h4 text-muted">{t('errors.title')}</h1>
      <p className="text-muted">{t('errors.text')}</p>
      <p className="text-muted"><a href={routes.homePagePath()}>{t('notFound.linkText')}</a></p>
    </div>
  );
};

export default ErrorDisplay;

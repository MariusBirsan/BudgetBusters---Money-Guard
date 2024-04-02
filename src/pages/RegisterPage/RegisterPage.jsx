import styles from './RegisterPage.module.css';
import RegisterForm from '../../components/RegistrationForm/RegistrationForm';
import { useSelector } from 'react-redux';
import { selectIsLoading } from 'redux(rares)/auth/selectors';

const RegisterPage = () => {
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) {
    return <div>Aici vine loading screen ul..</div>;
  }

  return (
    <div className={styles.registerPage}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;

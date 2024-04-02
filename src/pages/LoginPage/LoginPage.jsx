import { useSelector } from 'react-redux';
import styles from './LoginPage.module.css';
import { selectIsLoading } from 'redux(rares)/auth/selectors';
import LoginForm from 'components/LoginForm/LoginForm';

const LoginPage = () => {
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) {
    return <div>Aici vine loading screen ul...</div>;
  }

  return (
    <div className={styles.loginPage}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

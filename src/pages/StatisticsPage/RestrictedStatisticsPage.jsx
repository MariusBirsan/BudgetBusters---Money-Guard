import { Navigate } from 'react-router-dom';
import StatisticsPage from './StatisticsPage';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux(rares)/auth/selectors';

const RestrictedStatisticsPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <StatisticsPage /> : <Navigate to="/" />;
};

export default RestrictedStatisticsPage;

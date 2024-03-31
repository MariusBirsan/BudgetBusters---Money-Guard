import Header from 'components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './SharedLayout.module.css';
import Navigation from 'components/Navigation/Navigation';
import Balance from 'components/Balance/Balance';

import { useMediaQuery } from 'react-responsive';
//import TestCurrencyGraph from 'components/TestCurrencyGraph/TestCurrencyGraph';
import Currency from 'components/Currency/Currency';

const SharedLayout = () => {
  const location = useLocation();

  const locationCondition = location.pathname === '/dashboard/home';
  const screenCondition = useMediaQuery({ query: '(min-width: 768px)' });

  const renderBalanceCondition = locationCondition || screenCondition;

  return (
    <>
      <Header />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sharedSectionElements}>
            <div className={styles.navAndBalanceContainer}>
              <Navigation />

              {renderBalanceCondition ? <Balance /> : null}
            </div>

            {screenCondition && <Currency />}

            {/* Todo: just for test */}
            {/* {screenCondition && <TestCurrencyGraph />} */}
          </div>
          {/* todo : suspense */}
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default SharedLayout;

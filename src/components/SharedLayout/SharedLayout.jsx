import styles from './SharedLayout.module.css';
import { Outlet, useLocation } from 'react-router-dom';

import Header from 'components/Header/Header';
import Navigation from 'components/Navigation/Navigation';
import Balance from 'components/Balance/Balance';

import { useMediaQuery } from 'react-responsive';
import Currency from 'components/Currency/Currency';

const SharedLayout = () => {
  const screenCondition = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <>
      <Header />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sharedSectionElements}>
            <div className={styles.navAndBalanceContainer}>
              <Navigation />
              {screenCondition && <Balance />}
            </div>

            {screenCondition && <Currency />}
          </div>

          <Outlet />
        </div>
      </section>
    </>
  );
};

export default SharedLayout;

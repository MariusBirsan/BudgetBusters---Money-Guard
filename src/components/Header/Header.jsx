import styles from './Header.module.css';
import Logo from 'components/common/Logo/Logo';
import icons from '../../images/icons/sprite.svg';

// todo: username (useSelector, *take it from email => splice: start, to chart: "@")

const Header = () => {
  const username = 'Popescu Andrei';

  return (
    <header className={styles.header}>
      <div className="container">
        <Logo variant="navbarLogo" />

        <div className={styles.userMenu}>
          <span className={styles.username}>{username}</span>
          <span className={styles.delimiter}></span>
          <button className={styles.logOutBtn}>
            <svg>
              <use href={`${icons}#icon-exit`}></use>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

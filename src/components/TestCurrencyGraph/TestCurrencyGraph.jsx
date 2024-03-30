import styles from './TestCurrencyGraph.module.css';
import testImg from '../../images/testCurrencyGraph/form graphic.png';

const TestCurrencyGraph = () => {
  return (
    <div className={styles.test}>
      <img src={testImg} alt="" />
    </div>
  );
};

export default TestCurrencyGraph;

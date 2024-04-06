import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styles from './StatisticsDashboard.module.css';

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

const StatisticsDashboard = ({ onMonthChange, onYearChange }) => {
  const [width] = useWindowSize();

  const getWidth = () => {
    if (width >= 1280) {
      return '182px'; // pentru desktop
    } else if (width >= 768) {
      return '160px'; // pentru laptop
    } else {
      return '280px'; // dimensiunea implicită pentru mobil și tablete
    }
  };

  const customStyles = {
    control: provided => ({
      ...provided,
      width: getWidth(), // Aplică lățimea dinamic
      height: '50px',
      background:
        'linear-gradient(0deg, rgba(83, 61, 186, 0.7) 0%, rgba(80, 48, 154, 0.7) 43.14%, rgba(106, 70, 165, 0.525) 73.27%, rgba(133, 93, 175, 0.133) 120.03%)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: '0px 4px 60px rgba(0, 0, 0, 0.25)',
      borderRadius: '8px',
      color: 'white',
      fontFamily: 'Poppins',
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      background: isFocused ? 'rgba(158, 64, 186, 0.5)' : 'transparent',
      color: isFocused ? '#FF868D' : '#FFFFFF',
      cursor: 'pointer',
      fontFamily: 'Poppins',
    }),
    menu: styles => ({
      ...styles,
      marginTop: '10px',
      borderRadius: '8px',
      boxShadow: '0px 4px 60px 0px rgba(0, 0, 0, 0.4)',
      background:
        'linear-gradient(0deg, rgba(83, 61, 186, 0.85) 0%, rgba(80, 48, 154, 0.85) 43.14%, rgba(106, 70, 165, 0.775) 73.27%, rgba(133, 93, 175, 0.633) 120.03%)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
    }),
    singleValue: styles => ({
      ...styles,
      color: 'white',
    }),
    dropdownIndicator: provided => ({
      ...provided,
      color: 'white',
      '&:hover': {
        color: 'white',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const monthsOptions = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ].map((month, index) => ({ value: index + 1, label: month.label }));

  const yearsOptions = Array.from(new Array(10), (_, index) => ({
    value: currentYear - index,
    label: (currentYear - index).toString(),
  }));

  const [selectedMonth, setSelectedMonth] = useState(
    monthsOptions.find(month => month.value === currentMonth)
  );
  const [selectedYear, setSelectedYear] = useState({
    value: currentYear,
    label: currentYear.toString(),
  });

  const handleChangeMonth = selectedOption => {
    setSelectedMonth(selectedOption);
    if (onMonthChange) onMonthChange(selectedOption.value);
  };

  const handleChangeYear = selectedOption => {
    setSelectedYear(selectedOption);
    if (onYearChange) onYearChange(selectedOption.value);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.selectContainer} style={{ marginBottom: '20px' }}>
        <Select
          name="month"
          options={monthsOptions}
          onChange={handleChangeMonth}
          value={selectedMonth}
          styles={customStyles}
          classNamePrefix="react-select"
          isSearchable={false} // Dezactivează căutarea
        />
      </div>

      <div className={styles.selectContainer}>
        <Select
          name="year"
          options={yearsOptions}
          onChange={handleChangeYear}
          value={selectedYear}
          styles={customStyles}
          classNamePrefix="react-select"
          isSearchable={false} // Dezactivează căutarea
        />
      </div>
    </div>
  );
};

export default StatisticsDashboard;

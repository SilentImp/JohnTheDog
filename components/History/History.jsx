import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import c3 from "c3";
import styles from "./History.module.scss";
import 'c3/c3.css';

const History = ({dates, rates, sourceCurrency, targetCurrency}) => {
  useEffect(() => {
    c3.generate({
      bindto: "#chart",
      data: {
        x: 'x',
        columns: [
          ['x', ...dates],
          [`${sourceCurrency} → ${targetCurrency}`, ...rates],
        ],
        type: "line",
      },
      axis: {
        x: {
          show: true,
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        },
      }
    });
  }, [dates, rates, sourceCurrency, targetCurrency]);
  
  return <div id="chart" className={styles.History} />;
}

History.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.string).isRequired,
  rates: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  sourceCurrency: PropTypes.string.isRequired,
  targetCurrency: PropTypes.string.isRequired,
}

export default History;

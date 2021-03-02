import React, { useContext, useState } from 'react';
import Exchanger from 'utils/Exchanger';
import PropTypes from 'prop-types';
import Config from 'configs/currencyConfig';
import currencyjs from 'currency.js';

const ExchangeContext = React.createContext();

const ExchangeProvider = (props) => {
  const { 
    rates,
    from: defaultFrom,
    to: defaultTo,
    value: defaultValue,
  } = props;

  const [ exchangeRates, setExchangeRates ] = useState(rates);
  const [ sourceCurrency, setSourceCurrency ] = useState(defaultFrom);
  const [ targetCurrency, setTargetCurrency ] = useState(defaultTo);
  const getExchangeRate = async (from, to) => {
    if (exchangeRates[from]?.[to] !== undefined) return exchangeRates[from][to];
    if (exchangeRates[to]?.[from] !== undefined) return currencyjs(1, { precision: 10 }).divide(exchangeRates[to][from]).value;
    const response = await Exchanger.getExchangeRate(from);
    setExchangeRates({
      ...exchangeRates,
      [from]: response,
    });
    return response[to];
  };

  const value = {
    defaultRate: rates?.[targetCurrency] || null,
    defaultValue,
    sourceCurrency,
    setSourceCurrency,
    targetCurrency,
    setTargetCurrency,
    getExchangeRate,
  };

  return <ExchangeContext.Provider {...props} value={value} />;
};

ExchangeProvider.propTypes = {
  rates: PropTypes.shape({}).isRequired,
  from: PropTypes.string,
  to: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

ExchangeProvider.defaultProps = {
  value: Config.DEFAULT_AMOUNT,
  from: Config.DEFAULT_SOURCE,
  to: Config.DEFAULT_TARGET,
}

const useExchangeContext = () => useContext(ExchangeContext);

export { ExchangeProvider, useExchangeContext };
export default ExchangeContext;

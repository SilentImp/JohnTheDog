import { useExchangeContext } from "contexts/ExchangeContext";
import Exchanger from 'utils/Exchanger';
import React, { useEffect, useState } from 'react';
import currencyjs from 'currency.js';
import History from "./History";

const checkMobile = () => window.matchMedia('(max-width: 38rem)').matches;

const HistoryWithData = (props) => {
  const { 
    sourceCurrency, 
    targetCurrency,
  } = useExchangeContext();
  const [dates, setDates] = useState([]);
  const [rates, setRates] = useState([]);
  const [history, setHistory] = useState([]);
  const [isMobile, setIsMobile] = useState(checkMobile());
  const setDatesFromData = response => setDates(Object.keys(response));

  useEffect(() => {
    const setRatesFromData = response => setRates(Object.values(response).map(item => item[targetCurrency]));
    const setRatesFromDataSwap = response => setRates(Object.values(response).map(item => currencyjs(1, { precision: 10 }).divide(item[sourceCurrency]).value));
  
    const requestHistory = async () => {
      if (history[`${sourceCurrency}-${targetCurrency}`]) {
        setDatesFromData(history[`${sourceCurrency}-${targetCurrency}`]);
        setRatesFromData(history[`${sourceCurrency}-${targetCurrency}`]);
        return;
      }

      if (history[`${targetCurrency}-${sourceCurrency}`]) {
        setDatesFromData(history[`${targetCurrency}-${sourceCurrency}`]);
        setRatesFromDataSwap(history[`${targetCurrency}-${sourceCurrency}`]);
        return;
      }

      const response = await Exchanger.getHistoryForMonth(sourceCurrency, targetCurrency);
      setHistory({
        ...history, 
        [`${sourceCurrency}-${targetCurrency}`]: response,
      });
      setDatesFromData(response);
      setRatesFromData(response);
    }

    if (!isMobile) {
      requestHistory();
    }
  }, [history, isMobile, sourceCurrency, targetCurrency]);

  useEffect(() => {
    const resizeHandler = () => {
      const match = checkMobile();
      if (isMobile !== match) setIsMobile(match);
    };
    const observer = new ResizeObserver(resizeHandler);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [isMobile]);

  if (isMobile) return null;
  if (dates.length === 0 || rates.length === 0) return null;

  return (
    <History 
      targetCurrency={targetCurrency} 
      sourceCurrency={sourceCurrency}
      dates={dates}
      rates={rates}
      {...props}
    />
  );
};

export default HistoryWithData;

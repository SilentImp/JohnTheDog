import React from 'react';
import { useExchangeContext } from "contexts/ExchangeContext";
import ConvertorForm from "./ConvertorForm";


const ConvertorFormWithData = (props) => {
  const { 
    sourceCurrency,
    targetCurrency,
    defaultValue,
    setSourceCurrency,
    setTargetCurrency,
    getExchangeRate,
    history,
    defaultRate,
  } = useExchangeContext();

  return (
    <ConvertorForm
      defaultValue={defaultValue}
      history={history}
      setSourceCurrency={setSourceCurrency}
      setTargetCurrency={setTargetCurrency}
      targetCurrency={targetCurrency} 
      sourceCurrency={sourceCurrency}
      getExchangeRate={getExchangeRate}
      defaultRate={defaultRate}
      {...props}
    />
  );
};

export default ConvertorFormWithData;

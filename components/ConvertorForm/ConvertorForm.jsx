import React, {useState, useRef, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import currencyjs from 'currency.js';
import CurrencyOption from 'components/CurrencyOption';
import CurrencySelector from 'components/CurrencySelector';
import Config from 'configs/currencyConfig';
import styles from "./ConvertorForm.module.scss";

export const getPrefixAndSufix = (amount, currency) => {
// eslint-disable-next-line no-restricted-globals
  const value = isNaN(amount) ? 0 : amount;
  const formatedInput = new Intl.NumberFormat(Config.DEFAULT_LOCALE, { style: 'currency', currency, minimumSignificantDigits: 1 }).formatToParts(value);
  const types = ['integer', 'decimal', 'fraction'];
  const currencyIndex = formatedInput.findIndex(({type}) => type === "currency");
  const valueIndex = formatedInput.findIndex(({type}) => types.includes(type))
  const hasPrefix = currencyIndex < valueIndex;
  const prefix = hasPrefix ? <b>{formatedInput[currencyIndex].value}</b> : null;
  const postfix = !hasPrefix ? <b>{formatedInput[currencyIndex].value}</b> : null;
  return {
    prefix,
    postfix,
  }
}

// eslint-disable-next-line no-restricted-globals
export const getOutput = (amount, currency) => new Intl.NumberFormat(Config.DEFAULT_LOCALE, { style: 'currency', currency, minimumSignificantDigits: 1 }).format(isNaN(amount) ? 0 : amount);

const ConvertorForm = ({
  className,
  sourceCurrency, 
  targetCurrency,
  setSourceCurrency,
  setTargetCurrency,
  getExchangeRate,
  defaultValue,
  defaultRate,
}) => {
  let defaultPrefix = null;
  let defaultPostfix = null;
  let defaultOutput = 0;
  const [amount, setAmount] = useState(defaultValue);
  const [rate, setRate] = useState(defaultRate);
  const formRef = useRef(null);

  if (defaultRate) {
    const defaultConverted = currencyjs(amount).multiply(defaultRate).value;
    const prefixAndSufix = getPrefixAndSufix(amount, targetCurrency);
    defaultOutput = getOutput(defaultConverted, targetCurrency);
    defaultPrefix = prefixAndSufix.prefix;
    defaultPostfix = prefixAndSufix.postfix;
  }

  const [output, setOutput] = useState(defaultOutput);
  const [prefix, setPrefix] = useState(defaultPrefix);
  const [postfix, setPostfix] = useState(defaultPostfix);

  const amountChangeHandler = (event) => {
    const element = event.currentTarget;
    setAmount(element.value);
  }

  const calculateRate = useCallback(async () => {    
    const currentRate = await getExchangeRate(sourceCurrency, targetCurrency);
    const inputValue = currencyjs(amount);
    const prefixAndSufix = getPrefixAndSufix(inputValue.value, sourceCurrency);
    setPrefix(prefixAndSufix.prefix);
    setPostfix(prefixAndSufix.postfix);
    const outputValue = inputValue.multiply(currentRate).value || 0;
    const formatedOutput = getOutput(outputValue, targetCurrency);
    setOutput(formatedOutput);
    setRate(currencyjs(currentRate, { precision: 4 }).value);
  }, [amount, getExchangeRate, sourceCurrency, targetCurrency]);

  const onChangeSourceHandler = event => {
    setSourceCurrency(event.currentTarget.value);
  }

  const onChangeTargetHandler = event => {
    setTargetCurrency(event.currentTarget.value);
  }

  const switchHandler = event => {
    event.preventDefault();
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
  }

  const submitHandler = event => {
    event.preventDefault();
    calculateRate();
  }

  const fromOptions = Config.SUPPORTED_CURRENCY_LIST
    .sort()
    .map(currency => (
      <CurrencyOption 
        key={`from-${currency}`}
        currency={currency}
      />
    ));

  const toOptions = Config.SUPPORTED_CURRENCY_LIST
    .filter(currency => (currency !== sourceCurrency))
    .sort()
    .map(currency => (
      <CurrencyOption 
        key={`to-${currency}`} 
        currency={currency}
      />
    ));

  useEffect(() => calculateRate(), [sourceCurrency, targetCurrency, amount, getExchangeRate, calculateRate]);
  
  const formatedRate = new Intl.NumberFormat(Config.DEFAULT_LOCALE, {minimumSignificantDigits: 1}).format(rate);

  return (
    <form 
      ref={formRef}
      className={classNames(styles.ConvertorForm, className)} 
      method="POST" 
      onSubmit={submitHandler}
      action="/"
    >
      <CurrencySelector 
        value={sourceCurrency} 
        onChange={onChangeSourceHandler} 
        name="from" 
        label="From: " 
        className={styles.ConvertorForm__From}
      >
        {fromOptions}
      </CurrencySelector>
      <button 
        onClick={switchHandler}
        type="submit"
        formAction="/?switch=true"
        className={styles.ConvertorForm__Switch}
        tabIndex="0"
      >
        Switch
      </button>
      <CurrencySelector
        value={targetCurrency} 
        onChange={onChangeTargetHandler} 
        name="to" 
        label="To: " 
        className={styles.ConvertorForm__To}
      >
        {toOptions}
      </CurrencySelector>
      <label className={styles.ConvertorForm__Input}>
        {prefix}
        <input 
          autoComplete="off" 
          placeholder="0"
          name="value" 
          size="1" 
          type="text" 
          inputMode="decimal"
          value={amount}
          onChange={amountChangeHandler}
        />
        {postfix}
      </label>
      <output className={styles.ConvertorForm__Output}>
        {output}
      </output>
      {rate && (
      <p className={styles.ConvertorForm__Rate}>
        <b>Current rate: </b>
        <strong>{formatedRate}</strong> 
      </p>
      )}
    </form>
  );  
};

ConvertorForm.propTypes = {
  className: PropTypes.string,
  sourceCurrency: PropTypes.string.isRequired,
  targetCurrency: PropTypes.string.isRequired,
  setSourceCurrency: PropTypes.func.isRequired,
  setTargetCurrency: PropTypes.func.isRequired,
  getExchangeRate: PropTypes.func.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  defaultRate: PropTypes.number,
}

ConvertorForm.defaultProps = {
  className: undefined,
  defaultRate: undefined,
}

export default ConvertorForm;

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from "./CurrencySelector.module.scss";

const CurrencySelector = React.forwardRef(({ 
  value, 
  onChange, 
  label, 
  name, 
  children, 
  className, 
  ...rest}, ref) => (
    <label className={classNames(className, styles.CurrencySelector)}>
      <b>{label}</b>
      <select ref={ref} name={name} value={value} onChange={onChange} {...rest}>
        {children}
      </select>
    </label>
));


CurrencySelector.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
}

CurrencySelector.defaultProps = {
  className: undefined,
  children: undefined,
}

export default CurrencySelector;

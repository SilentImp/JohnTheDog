import React from 'react';
import PropTypes from 'prop-types';

const CurrencyOption = ({ currency, ...rest }) => 
  (<option value={currency} {...rest}>{ currency }</option>);

CurrencyOption.propTypes = {
  currency: PropTypes.string.isRequired,
}

export default CurrencyOption;

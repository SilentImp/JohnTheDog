import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import ConvertorForm from "components/ConvertorForm";
import { ExchangeProvider } from "contexts/ExchangeContext";
import dynamic from 'next/dynamic';
import Config from "configs/currencyConfig";

const History = dynamic(() => import("components/History"), { ssr: false });


const Convertor = ({ 
  rates, 
  from,
  to,
  value
}) => (
  <>
    <Head>
      <title>Currency Convertor</title>
      <meta name="author" content="Anton Nemtsev" />
      <meta name="description" content="Currency convertor" />
    </Head>
    <ExchangeProvider 
      rates={rates}
      from={from}
      to={to}
      value={value}
    >
      <ConvertorForm />
      <History />
    </ExchangeProvider>
  </>
);

Convertor.propTypes = {
  rates: PropTypes.shape({}).isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Convertor.defaultProps = {
  value: Config.DEFAULT_AMOUNT,
};

export default Convertor;

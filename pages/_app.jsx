import React from 'react';
import PropTypes from 'prop-types';
import '../styles/globals.css';
import '../styles/reset.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired
};

export default MyApp;

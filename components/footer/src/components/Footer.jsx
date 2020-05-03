import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ message }) => <div>Message of the day: {message}</div>;

Footer.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Footer;

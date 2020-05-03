import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ title }) => <div>Footer: {title}</div>;

Footer.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Footer;

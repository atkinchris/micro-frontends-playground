import React from 'react';
import PropTypes from 'prop-types';

const Body = ({ data }) => <div>Body data: <pre>{JSON.stringify(data, null, '\t')}</pre></div>;

Body.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Body;

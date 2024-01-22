import React from 'react';

const ErrorComponent = ({ message }) => (
  <div  style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
    <h2>{message}</h2>
  </div>
);

export default ErrorComponent;
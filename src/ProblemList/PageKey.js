import React from 'react';

const PageKey = ({ direction, curPage, onClick }) => {
  if (direction === 'prev') {
    return <button direction={direction} onClick={() => onClick(curPage - 1)}>👈</button>;
  }
  return <button direction={direction} onClick={() => onClick(curPage + 1)}>👉</button>;
};

export default PageKey;
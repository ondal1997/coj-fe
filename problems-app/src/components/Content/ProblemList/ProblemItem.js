import React from 'react';
import Category from './Category';

const ProblemItem = ({ info }) => (
  <tr style={{ textAlign: 'center', border: '1px solid gray' }}>
    <td>{info.key}</td>
    <td>{info.title}
    {info.categories.map((item) => <Category name={item} />)}
    </td>
  </tr>
);

export default ProblemItem;
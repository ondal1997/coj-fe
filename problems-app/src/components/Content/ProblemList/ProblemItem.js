import React from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';

const ProblemItem = ({ info }) => (
  <tr style={{ textAlign: 'center', border: '1px solid gray' }}>
    <td>{info.key}</td>
    <td>{info.title}
    {info.categories.map((item) => <Category name={item} />)}
    </td>
    <td>
      <Link to={`/solutions/${info.key}`}>
      <button>GO!</button>
      </Link>
    </td>
  </tr>
);

export default ProblemItem;
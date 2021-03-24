import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav>
    <ul>
      <Link to="/">
      <li>Home</li>
      </Link>
      <Link to="/solutions">
      <li>풀이 제출 현황</li>
      </Link>
      <Link to="/problems">
      <li>문제 리스트</li>
      </Link>
      <Link to="/problemsForm">
      <li>문제 제출</li>
      </Link>
      <Link to="/solutionForm">
      <li>솔루션 제출</li>
      </Link>
    </ul>
  </nav>
);

export default Nav;
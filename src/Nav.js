import React from 'react';
import { OurLink } from './OurLink';

const Nav = () => (
  <nav>
    <ul>
      <OurLink to="/">
      <li>Home</li>
      </OurLink>
      <OurLink to="/solutions">
      <li>풀이 제출 현황</li>
      </OurLink>
      <OurLink to="/problems/1">
      <li>문제 리스트</li>
      </OurLink>
      <OurLink to="/problemsForm">
      <li>문제 제출</li>
      </OurLink>
    </ul>
  </nav>
);

export default Nav;
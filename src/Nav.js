import React from 'react';
import { OurLink } from './OurLink';

const Nav = () => (
  <nav>
    <h3>테스트용 네비게이션</h3>
    <ul>
      <OurLink to="/allSolutions/1">
      <li>전체 풀이 제출 현황</li>
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
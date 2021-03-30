import React from 'react';
import { Link } from 'react-router-dom';

const IS_DEPLOYED = true;
const codersUrl = 'http://codersit.co.kr/oj';

const OurLink = (props) => {
  const { to, children } = props;

  return IS_DEPLOYED ? (
    <a href={`${codersUrl}${to}`}>
        {children}
    </a>
  ) : (
    <Link to={to}>
        {children}
    </Link>
  );
};

const ourHref = (url, history) => {
  if (IS_DEPLOYED) {
    window.location.href = `${codersUrl}${url}`;
  } else {
    history.push(url);
  }
};

export { OurLink, ourHref };

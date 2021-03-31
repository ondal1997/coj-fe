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

const ourFetch = async (url, meta) => {
  if (IS_DEPLOYED) {
    alert('fetched!');
    meta = meta || { method: 'GET' };

    const newBody = {};
    newBody.to = url.slice(url.indexOf('api'));
    if (meta.body) {
      newBody.data = JSON.parse(meta.body);
    }
    newBody.method = meta.method;
    meta.method = 'POST';

    meta.body = JSON.stringify(newBody);

    return fetch('/coders/post.php', meta);
  }

  return fetch(url, meta);
};

export { OurLink, ourHref, ourFetch };

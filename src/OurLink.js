import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledAnchor = styled.a`
    color: white;
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

// 링크 기본 스타일 제거
const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const IS_DEPLOYED = false;
const codersUrl = 'http://codersit.co.kr/oj';

const OurLink = (props) => {
  const { to, children } = props;

  return IS_DEPLOYED ? (
    <StyledAnchor href={`${codersUrl}${to}`}>
        {children}
    </StyledAnchor>
  ) : (
    <StyledLink to={to}>
        {children}
    </StyledLink>
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

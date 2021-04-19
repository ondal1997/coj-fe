import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import $ from 'jquery';

// 링크 기본 스타일 제거
const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const IS_DEPLOYED = true;
// const codersUrl = 'http://codersit.co.kr/oj';

const OurLink = (props) => {
  const { to, children } = props;
  return (
    <StyledLink to={to}>
        {children}
    </StyledLink>
  );
};

const ourHref = (url, history) => {
  history.push(url);
};

const ourFetchAndJson = async (url, meta) => {
  if (IS_DEPLOYED) {
    meta = meta || { method: 'GET' };

    const newBody = {};
    if (meta.body) {
      newBody.data = meta.body;
    }
    newBody.to = url.slice(url.indexOf('api'));
    newBody.method = meta.method;

    const json = await $.ajax({
      url: '/coders/post.php',
      type: 'POST',
      data: newBody,
      dataType: 'json',
    });
    return json;
  }

  const res = await fetch(url, meta);
  const json = await res.json();
  return json;
};

export { OurLink, ourHref, ourFetchAndJson };

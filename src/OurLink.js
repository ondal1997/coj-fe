import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const isProductionMode = true;

// 링크 기본 스타일 제거
const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const OurLink = (props) => {
  const { to, children } = props;
  return (
    <StyledLink to={to}>
      {children}
    </StyledLink>
  );
};

const fetchAndJson = async (url, meta) => {
  if (isProductionMode) {
    meta = meta || { method: 'GET' };

    const data = {
      to: url,
      method: meta.method,
    };
    if (meta.body) {
      Object.assign(data, { data: meta.body });
    }

    const json = await $.ajax({
      url: 'https://codersit.co.kr/coders/post.php',
      type: 'POST',
      data,
      dataType: 'json',
    });
    return json;
  }

  try {
    const res = await fetch(`http://192.168.0.100:3000${url}${(url.includes('?') ? '&' : '?')}userId=migu554`, meta);
    const json = await res.json();
    return json;
  } catch (err) {
    return { status: 500 };
  }
};

const pureFetchAndJson = async (url, meta) => {
  if (isProductionMode) {
    meta = meta || { method: 'GET' };

    const data = {
      to: url,
      method: meta.method,
    };
    if (meta.body) {
      Object.assign(data, { data: meta.body });
    }

    const json = await $.ajax({
      url: 'https://codersit.co.kr/coders/post.php',
      type: 'POST',
      data,
      dataType: 'json',
    });
    return json;
  }

  const res = await fetch(`http://192.168.0.100:3000${url}${(url.includes('?') ? '&' : '?')}userId=migu554`, meta);
  const json = await res.json();
  return json;
};

export { OurLink, fetchAndJson, pureFetchAndJson };

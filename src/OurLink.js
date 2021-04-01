import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const IS_DEPLOYED = false;
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

// (async () => {
//   const res = await fetch('http://192.168.0.100:3000/haha', {
//     method: 'POST',
//     body: {
//       to: 'api/solutions',
//       method: 'GET',
//     },
//   });

//   const json = await res.text();
//   console.log(json);
// })();

// $.ajax({
//   url:'http://192.168.0.100:3000/haha', // 요청 할 주소
//   type:'POST', // GET, PUT
//   data: JSON.stringify({
//      to:'api/solutions',
//      method: 'GET',
//   }),// 전송할 데이터
//   dataType:'json',// xml, json, script, html
//   beforeSend: function (xhr) {
//     xhr.setRequestHeader("Content-type","application/json");
// },
//   success:function(jqXHR) {
//      console.log(jqXHR);
//   },// 요청 완료 시
//   error:function(jqXHR) {},// 요청 실패.
//   complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
// });

const ourFetchAndJson = async (url, meta) => {
  if (IS_DEPLOYED) {
    meta = meta || { method: 'GET' };

    const newBody = {};
    if (meta.body) {
      newBody.data = JSON.parse(meta.body);
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
  let json = {};

  try {
    json = await res.json();
  } catch (error) {
    console.log('.');
  }

  return json;
};

export { OurLink, ourHref, ourFetchAndJson };

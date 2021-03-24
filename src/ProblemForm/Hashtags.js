import React from 'react';

const Hashtags = ({ hashtags, updateHashtags }) => {
  const deleteHashtag = (i) => {
    const newHashtags = hashtags.filter((e, index) => index !== i);

    updateHashtags(newHashtags);
  };

  const onEnterInput = (e) => {
    const newHashtags = [...hashtags];
    newHashtags.push(e.target.value);
    updateHashtags(newHashtags);
    e.target.value = '';
  };

  return <div>
    {hashtags.map((hashtag, number) => <div>
      <button>{hashtag}</button>
      <button onClick={() => deleteHashtag(number)}>➖</button>
      </div>)}
    <input placeholder="hashtag" onKeyPress={(e) => { if (e.charCode === 13) onEnterInput(e); }} />
    </div>;
};

export default Hashtags;
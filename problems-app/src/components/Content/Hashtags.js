import React from 'react';

const Hashtags = ({ hashtags, updateHashtags }) => {
  const deleteHashtag = (i) => {
    const newHashtags = hashtags.filter((e, index) => index !== i);

    updateHashtags(newHashtags);
  };

  const onEnterInput = (e) => {
    const newHashtags = [...hashtags];
    newHashtags.push({
      key: newHashtags.length + 1,
      name: e.target.value,
    });
    updateHashtags(newHashtags);
    e.target.value = '';
  };

  return <div>
    {hashtags.map(({ name }, number) => <div>
      <button>{name}</button>
      <button onClick={() => deleteHashtag(number)}>➖</button>
      </div>)}
    <input placeholder="Hashtag" onKeyPress={(e) => { if (e.charCode === 13) onEnterInput(e); }} />
    </div>;
};

export default Hashtags;
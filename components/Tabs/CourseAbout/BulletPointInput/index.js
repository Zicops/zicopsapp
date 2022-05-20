import React, { useEffect, useState } from 'react';
import styles from '../../courseTabs.module.scss';

export default function BulletPointInput({
  placeholder,
  name,
  course,
  updateCourse,
  isBullet = true
}) {
  let nameArr = !!course[name] && course[name].length > 0 ? course[name] : [];

  const [input, setInput] = useState('');
  const [tags, setTags] = useState(nameArr);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  function onKeyDown(e) {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput('');
    }

    if (key === 'Backspace' && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  }
  function deleteTag(index) {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  }

  useEffect(() => {
    updateCourse({
      ...course,
      [name]: tags
    });
  }, [tags]);

  return (
    <>
      <div
        className={`w-100 ${styles.bulletPointInputContainer} ${
          isBullet ? '' : styles.tagsContainer
        }`}>
        {/* <ul> */}
          {tags.map((tag, index) => (
            <span key={index} className={`w-100 ${isBullet ? styles.bullets : styles.tags}`}>
              {tag}
              <button onClick={() => deleteTag(index)}>x</button>
            </span>
          ))}
        {/* </ul> */}
        <input
          name={name}
          value={input}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          onKeyUp={() => setIsKeyReleased(true)}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </>
  );
}

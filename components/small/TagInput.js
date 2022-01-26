import React, { useState } from 'react';

const TagInput = ({placeholder}) => {
    
    const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false);

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
      };
    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();

        if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            setInput('');
        }

        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            e.preventDefault();
            setTags(tagsCopy);
            setInput(poppedTag);
        }

        setIsKeyReleased(false);
    };

    const onKeyUp = () => {
        setIsKeyReleased(true);
    }
    const deleteTag = (index) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }
    return(
        <>
        <div className="container">
            {tags.map((tag, index) => <div className="tag">{tag}
            <button onClick={() => deleteTag(index)}>x</button>
            </div>)}
            <input
                value={input}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onChange={onChange}
            />
        </div>
        <style jsx>
            {`
            .container {
                display: flex;
                flex-wrap: wrap;
                // padding-left: 14px;
                // border: 1px grey solid;
                border-radius: 5px;
                // color: black
            }
            
            .tag {
                display: flex;
                align-items: center;
                margin: 10px 0;
                margin-right: 10px;
                padding-left: 10px;
                padding-right: 5px;
                border: 1px solid var(--primary);
                border-radius: 5px;
                background-color: var(--primary);
                white-space: nowrap;
                color: white;
            }
            
            .tag button {
                display: flex;
                padding: 6px;
                border: none;
                background-color: unset;
                cursor: pointer;
                color: white;
            }
            `}
        </style>
        </>
    )
    
}

export default TagInput
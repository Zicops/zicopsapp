import React, { useEffect, useState } from 'react';

const BulletPointInput = ({placeholder, name, course, updateCourse}) => {

    let nameArr = (course[name].length > 0) ? course[name] : [];

    const [input, setInput] = useState('');
    const [tags, setTags] = useState(nameArr);
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
        setTags(prevState => prevState.filter((tag, i) => i !== index));
    }

    useEffect(() => {
        updateCourse({
            ...course,
            [name]: tags
        })
    }, [tags])

    return(
        <>
        <div className="container">
            {tags.map((tag, index) => <div key={index} className="bullets"><li>{tag}</li>
            <button onClick={() => deleteTag(index)}>x</button>
            </div>)}
            <input name={name}
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
                flex-direction: column;
                // padding-left: 14px;
                // border: 1px grey solid;
                border-radius: 5px;
                // color: black
            }
            
            .bullets {
                margin: 2px 10px;
                border-radius: 5px;
                // white-space: nowrap;
                color: var(--dark_three);
                display: flex;
                justify-content: space-between;
                border: 1px grey solid;
                padding: 3px 10px;
                background-color: var(--tertiary_black);
                font-size: 13px;
            }
            
            .bullets button {
                display: flex;
                padding: 0px;
                border: none;
                background-color: unset;
                cursor: pointer;
                color: #ffffff;
            }
            `}
        </style>
        </>
    )
    
}

export default BulletPointInput
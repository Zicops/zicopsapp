const Dropdown = () => {
    return (
        <>
        <div className="select">
            <select id="course">
                <option value="hide">Self Paced</option>
                <option value="2010">Courses 11</option>
                <option value="2011">Courses 22</option>
                <option value="2012">Courses 33</option>
            </select>
        </div>
            <style jsx>
                {`
                    .select select{
                        cursor: pointer;
                        display: inline-block;
                        position: relative;
                        font-size: 16px;
                        width: 200px;
                        height: 40px;
                        background-color: var(--dark_one);
                        color: var(--primary);
                        border: 2px solid var(--primary);
                        outline: none;
                        padding: 0 10px;
                        font-weight: 600;
                    }
                `}
            </style>
        </>
    )
}

export default Dropdown
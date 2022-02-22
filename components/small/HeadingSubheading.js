const HeadingSubheading = () => {
    return (
        <>
        <div className="module-header">
            <div className="heading">
                <h2>Fundamentals of Design Thinking</h2>
            </div>
            <div className="subheading">
                Expertise Level: <span>Beginner</span>
            </div>
        </div>
            <style jsx>
                {`
                    .module-header{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 15px 0 40px 0;
                    }
                    .heading{
                        margin-top: 20px;
                    }
                    .subheading {
                        font-size: 13px;
                        color: #858f8f;
                    }
                    .heading h2{
                        font-size: 22px;
                        font-weight: normal;
                        line-height: 30px ;
                        color: #ffffff;
                    }
                `}
            </style>
        </>
    )
}

export default HeadingSubheading
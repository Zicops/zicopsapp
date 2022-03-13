const ModuleBox = ( {children} ) => {
    return ( 
        <>
        <div className="module_box">

        {children}

        </div>
        <style jsx>
            {`
            .module_box{
                width: 90%;
                min-height: 200px;
                border-radius: 10px;
                border: 1px solid var(--primary);
                background-color: var(--black);
                padding: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            `}
        </style>
        </>
     );
}
 
export default ModuleBox;
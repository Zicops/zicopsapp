import { useState } from "react";

const OnSave = (e) => {
    e.preventDefault();
    const [inputField, setInputField] = useState({
        name:'',
        description:'',
        summary:'',
        category:'',
        status: 'SAVED'
    })

    // const inputHandler = (e) => {
        setInputField({
            ...inputField, 
            [e.target.name]:e.target.value,
            [e.target.description]:e.target.value,
            [e.target.summary]:e.target.value,
            [e.target.category]:e.target.value,
        })
    // }


    const ShowOnSave = () => { 
        alert('On Save')
        console.log(inputField)
    };
    ShowOnSave()
}
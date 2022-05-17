import QuestionSection from '../components/LearnerExamComp';
import {useEffect, useState} from "react";
import LearnerExamComponent from "../components/LearnerExamComp";

const ExamScreen = () => {

    const examData = [
        {
            id: 1,
            question: {
                text: '1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae rerum, sunt! Animi debitis ducimus expedita incidunt nihil officiis possimus soluta.',
                image: '/images/bg-new.png'
            },
            options: [
                {
                    id: 'a',
                    text: '1Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    id: 'b',
                    text: '1Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    id: 'c',
                    text: '1Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    id: 'd',
                    image: '/images/bg-new.png'
                },
            ]
        },
        {
            id: 2,
            question: {
                text: '2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae rerum, sunt! Animi debitis ducimus expedita incidunt nihil officiis possimus soluta.',
                image: '/images/bg-new.png'
            },
            options: [
                {
                    id: 'a',
                    text: '2Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    id: 'b',
                    text: '2Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    id: 'c',
                    text: '2Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    id: 'd',
                    image: '/images/bg-new.png'
                },
            ]
        },
        {
            id: 3,
            question: {
                text: '3Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae rerum, sunt! Animi debitis ducimus expedita incidunt nihil officiis possimus soluta.',
                image: '/images/bg-new.png'
            },
            options: [
                {
                    id: 'a',
                    text: '3Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    id: 'b',
                    text: '3Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    id: 'c',
                    text: '3Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    id: 'd',
                    image: '/images/bg-new.png'
                },
            ]
        },
        {
            id: 4,
            question: {
                text: '4Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae rerum, sunt! Animi debitis ducimus expedita incidunt nihil officiis possimus soluta.',
                image: '/images/bg-new.png'
            },
            options: [
                {
                    id: 'a',
                    text: '4Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    id: 'b',
                    text: '4Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    id: 'c',
                    text: '4Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    id: 'd',
                    image: '/images/bg-new.png'
                },
            ]
        },
        {
            id: 5,
            question: {
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae rerum, sunt! Animi debitis ducimus expedita incidunt nihil officiis possimus soluta.',
                image: '/images/bg-new.png'
            },
            options: [
                {
                    id: 'a',
                    text: '5Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    id: 'b',
                    text: '5Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    id: 'c',
                    text: '5Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    id: 'd',
                    image: '/images/bg-new.png'
                },
            ]
        }
    ];

    examData.forEach((each) => {
        each.isVisited = false;
        each.isMarked = false;
        each.selectedOption = null;
    })


    examData[0].isVisited = true;

    const [data, setData] = useState(examData);
    const [current, setCurrent] = useState(data[0]);

    return(
        <>
            <LearnerExamComponent
                data={data} setData={setData}
                current={current} setCurrent={setCurrent}
            />
        </>
    );
}

export default ExamScreen;
ExamScreen.layout= null;
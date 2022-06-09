import styles from './pacman.module.scss';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";

function useKey(key, cb){

    const cbRef = useRef(cb);

    useEffect(() => {
        cbRef.current = cb;
    })

    useEffect(() => {
        function handle(event) {
            if(event.code === key){
                cbRef.current(event);
            }
        }
        document.addEventListener("keydown", handle);
        return () => document.removeEventListener("keydown", handle)
    }, [key])
}

const Pacman = () => {

    // const {arrow_navigator_clicked } = styles ;

    const myRef = useRef()

    const [clicked, setClicked] = useState(false)
    const [clickedButton, setClickedButton] = useState('')
    // top={125} left={280}
    const [top, setTop] = useState(125)
    const [left, setLeft] = useState(280)

    const handleClick = (event) => {
        setClickedButton(event.key)
        setClicked(true)
        setTimeout(() => {
            setClicked(false)
            setClickedButton('')
        }, 200)
        let moveBy = 10;
        if(top > 115 && top < 495){
            switch (event.key) {
                case 'ArrowLeft':
                    setLeft((left - moveBy))
                    break;
                case 'ArrowRight':
                    setLeft((left + moveBy))
                    break;
                case 'ArrowUp':
                    setTop((top - moveBy))
                    break;
                case 'ArrowDown':
                    setTop((top + moveBy))
                    break;
            }
        }
        switch (event.key) {
            case 'ArrowLeft':
                setLeft((left - moveBy))
                break;
            case 'ArrowRight':
                setLeft((left + moveBy))
                break;
            case 'ArrowDown':
                setTop((top + moveBy))
                break;
        }
        console.log(left, top)
    }

    // const handleArrowUp = (event) => {
    //     handleClick(event)
    // }
    // const handleArrowDown = (event) => {
    //     handleClick(event)
    // }
    // const handleArrowLeft = (event) => {
    //     handleClick(event)
    // }
    // const handleArrowRight = (event) => {
    //     handleClick(event)
    // }

    useKey("ArrowUp", handleClick)
    useKey("ArrowDown", handleClick)
    useKey("ArrowLeft", handleClick)
    useKey("ArrowRight", handleClick)


    return(
        <>
            {/*<div className={`${styles.}`}></div>*/}
            <div className={`${styles.container}`}>
                <div className={`${styles.pacman_container}`}>
                    <div className={`${styles.arrow_navigator_container}`}>
                        <div className={`
                            ${styles.arrow_navigator} ${styles.arrow_navigator_up} 
                            ${clicked && clickedButton === 'ArrowUp' ? styles.arrow_navigator_clicked : ''}`}
                        ><ArrowUpwardIcon /></div>
                        <div className={`${styles.arrow_navigator_container_flex}`}>
                            <div className={`
                                ${styles.arrow_navigator} 
                                ${styles.arrow_navigator_left}
                                ${clicked && clickedButton === 'ArrowLeft' ? styles.arrow_navigator_clicked : ''}`}
                            ><ArrowBackIcon /></div>
                            <div className={`
                                ${styles.arrow_navigator}
                                ${clicked && clickedButton === 'ArrowDown' ? styles.arrow_navigator_clicked : ''}`}
                            ><ArrowDownwardIcon /></div>
                            <div className={`
                                ${styles.arrow_navigator} 
                                ${styles.arrow_navigator_right}
                                ${clicked && clickedButton === 'ArrowRight' ? styles.arrow_navigator_clicked : ''}`}
                            ><ArrowForwardIcon /></div>
                        </div>
                    </div>
                    <div className={`${styles.pacman_board_container}`}>
                        <Box position={'absolute'} top={top} left={left}>
                            <div ref={myRef} className={` ${styles.pac_man}`}></div>
                        </Box>

                    </div>
                </div>
            </div>
        </>
    );
}

// function Scroll(myRef) {
//     useEffect(function mount() {
//         function onScroll() {
//             console.log("scroll!");
//         }
//
//         window.myRef.addEventListener('keydown', onScroll);
//
//         return function unMount() {
//             window.myRef.removeEventListener('keydown', onScroll);
//         };
//     });
//
//     return null;
// }
//
export default Pacman;